import {useQuery} from "@tanstack/react-query"
import { getListaFavoritos } from "./produtos"

export function useListaFavoritos(){
    const {data, isPending, isError, refetch } = useQuery({
        queryKey: ["listaFavoritos"],
        queryFn: () => getListaFavoritos(),
    });
    return { favoritos: data, refetchFavoritos: refetch, isPending, isError}
}
