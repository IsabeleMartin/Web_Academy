"use client";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";
import { useState } from "react";
import { mockItensCarrinho } from "./mocks/itensCarrinho";
import { mockProdutos } from "./mocks/produtos";

import { Produto } from "./types/produto";
import { ItemCarrinho } from "./types/carrinho";

export default function Produtos() {
  const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);
  const [valorTotal, setValorTotal] = useState<number>(0);

  // Função para adicionar um produto ao carrinho
  const adicionarAoCarrinho = (produto: Produto) => {
    // Atualizando a quantidade total de itens
    setQuantidadeTotal((prevQuantidade) => prevQuantidade + 1);

    // Atualizando o valor total da compra com o preço do produto
    setValorTotal((prevValor) => prevValor + produto.preco * 1); // Multiplicando por 1, pois estamos adicionando 1 unidade do produto

    // Criando um novo item para o carrinho
    const newItemCarrinho: ItemCarrinho = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1, // Quantidade inicial do produto ao ser adicionado
    };

    // Adicionando o item ao carrinho (mockItensCarrinho)
    mockItensCarrinho.push(newItemCarrinho);
  };

  return (
    <>
      {/* Passando os estados para o ResumoCarrinho */}
      <ResumoCarrinho valorTotal={valorTotal} quantidadeTotal={quantidadeTotal} />
      {/* Passando a função e os produtos para o ListagemProdutos */}
      <ListagemProdutos produtos={mockProdutos} adicionarAoCarrinho={adicionarAoCarrinho} />
    </>
  );
}
