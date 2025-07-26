import {useQuery} from "@tanstack/react-query"
import { getListaProduto, fetchProdutoDetails } from "./produtos"

export function useListaProdutos(){
    const {data, isPending, isError } = useQuery({
        queryKey: ["listaProdutos"],
        queryFn: () => getListaProduto(),
    });
    return { produtos: data, isPending, isError}
}


export function useGetProduto(nameProd: string){
    const {data, isPending, isError } = useQuery({
        queryKey: ["detalheProdutos"],
        queryFn: () => fetchProdutoDetails(nameProd),
    });
    return { produtoGet: data, isPending, isError}
}
