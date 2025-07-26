import Image from "next/image";
import { Produto } from "../../types/produto";
import { useDeleteFavorito } from "@/app/services/useDeleteFavItem"; // Hook para deletar favorito
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

interface IItemFavoritoProps {
  itemFavorito: Produto;
  refetchFavoritos: ()=>void;
}

export default function ItemFavorito({itemFavorito}: IItemFavoritoProps) {
    const queryClient = useQueryClient();
  const { isPending, deleteFavorito } = useDeleteFavorito(
    () => {toast.success("Produto removido dos favoritos!")
           queryClient.invalidateQueries({ queryKey: ["listaFavoritos"]});
    }, // Sucesso
    () => toast.error("Algo deu errado") // Erro
  );

  // Função para remover o favorito localmente após a exclusão no servidor
  

  return (
    <tr key={itemFavorito.id}>
      <td className="d-flex flex-row">
        <Image
          className="rounded"
          src={itemFavorito.fotos[0].src}
          alt={itemFavorito.fotos[0].titulo}
          width={50}
          height={50}
        />
        <div className="d-flex flex-column ms-2">
          <span>{itemFavorito.nome}</span>
          <small className="text-muted">{itemFavorito.descricao}</small>
        </div>
      </td>

      <td>
        R${" "}
        {Number(itemFavorito.preco).toFixed(2)}
      </td>

      <td>
        <button
          onClick={() => deleteFavorito(itemFavorito.id)} // Passa o id para a função de deletar
          className="btn btn-outline-danger btn-sm"
          disabled={isPending}  // Desabilita o botão enquanto a operação está pendente
        >
          {isPending ? "Removendo..." : "Remover"}  {/* Exibe texto dependendo do estado */}
        </button>
      </td>
    </tr>
  );
}
