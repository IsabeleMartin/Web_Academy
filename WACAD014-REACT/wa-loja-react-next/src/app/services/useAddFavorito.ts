import { useMutation } from "@tanstack/react-query";

import { addProdutoFavorito} from "./produtos"
import { Produto } from "../types/produto";

export function useAddFavorito(onSuccess: () => void, onError: () => void) {

    const { mutate, isPending } = useMutation({
        mutationFn: (produto: Produto) => addProdutoFavorito(produto),
        onSuccess,
        onError,
    })

    return {
        addFavorito: mutate,
        isPending,
    }
  
}
