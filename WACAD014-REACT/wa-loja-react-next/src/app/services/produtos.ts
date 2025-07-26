import { AxiosError } from "axios";
import { Produto } from "../types/produto";
import { produtosApi, apiFavoritos } from "./api"

export async function getListaProduto(): Promise<Produto[]> {
    return produtosApi.get("/produto").then((response) => response.data);

}

export async function addProdutoFavorito(produto: Produto) {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return apiFavoritos
            .post<Produto>("/favoritos", produto)
            .then((response) => response.data);
    } catch (err) {
        console.error("Erro ao adicionar aos favoritos", err);
        throw err;
    }
}

export async function getListaFavoritos(): Promise<Produto[]> {
    return apiFavoritos.get("/favoritos").then((response) => response.data);
}

export async function deleteItemFavoritos(idProduto: string): Promise<Produto[]> {
    try {
        // A URL agora inclui dinamicamente o idProduto para deletar o item correto
        const response = await apiFavoritos.delete(`/favoritos/${idProduto}`);
        return response.data;  // Retorna os dados da resposta, geralmente a lista de favoritos atualizada
    } catch (error) {
        console.error("Erro ao excluir item dos favoritos:", error);
        throw error;  // Lança o erro para ser tratado no frontend
    }
}




export async function fetchProdutoDetails(nomeProduto: string): Promise<Produto> {
  if (!nomeProduto) {
    // Verifica se o nome do produto é válido
    console.error("Nome do produto não pode ser vazio ou indefinido.");
    throw new Error("Nome do produto não pode ser vazio ou indefinido.");
  }

  try {
    // Faz a requisição para obter os detalhes do produto
    const response = await produtosApi.get(`/produto/${nomeProduto}`);

    // Retorna os dados do produto
    return response.data;
  } catch (error: unknown) {
    // Verifica se o erro é uma instância de AxiosError
    if (error instanceof AxiosError) {
      // Acesso seguro às propriedades de erro do Axios
      console.error(`Erro ao buscar os detalhes do produto: ${error.response?.status} - ${error.response?.data}`);

      // Exibe os detalhes completos da resposta de erro para ajudar no diagnóstico
      if (error.response) {
        console.error("Detalhes da resposta de erro:", error.response);
      }
    } else {
      // Erro genérico caso o erro não seja do Axios
      console.error("Erro ao tentar conectar ao servidor:", (error as Error).message);
    }

    // Lança um erro com uma mensagem mais detalhada
    throw new Error("Erro ao buscar os detalhes do produto");
  }
}