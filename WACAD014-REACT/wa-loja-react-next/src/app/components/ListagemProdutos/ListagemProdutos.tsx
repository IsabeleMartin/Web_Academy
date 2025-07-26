"use client"
import { useListaProdutos } from "@/app/services/useListaProductos";
import CardProduto from "../CardProduto/CardProduto";
import { Produto } from "@/app/types/produto";



interface ListagemProdutosProps {
  adicionarAoCarrinho: (produto: Produto ) => void;
}

export default function ListagemProdutos({adicionarAoCarrinho}: ListagemProdutosProps) {
  const { produtos, isPending, isError } = useListaProdutos();

  
  if (isPending) return <h5>Carregando...</h5>

  if (isError) return <h5>Ocorreu um erro ao carregar os produtos.</h5>

  if (!produtos) return <h5>Não há produtos disponíveis no momento.</h5>


  return (
    <div className="container p-5">
      <h5 className="mb-3">Produtos disponíveis:</h5>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            adicionarAoCarrinho={adicionarAoCarrinho} 
           // Passando a função para o CardProduto
          />
        ))}
      </div>
    </div>
  );
}
