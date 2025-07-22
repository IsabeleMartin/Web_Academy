import { Produto } from "../types/produto";
import api from "./api"

export async function getListaProduto(): Promise<Produto[]> {
    return api.get("/produto").then((response)=>response.data);
    
}