import { useMutation } from "@tanstack/react-query";
import { deleteItemFavoritos } from "./produtos"; // Certifique-se de que deleteItemFavoritos está configurado corretamente


export function useDeleteFavorito(onSuccess: () => void, onError: () => void) {
  // Corrigindo a função de mutação para usar o id do produto
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteItemFavoritos(id), // Passando o id, não o produto
    onSuccess,
    onError,
  });

  return {
    deleteFavorito: mutate,  // A função mutate que dispara a exclusão
    isPending,  // Estado de carregamento correto
  };
}
