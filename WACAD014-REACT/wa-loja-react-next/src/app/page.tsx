"use client";  // Adicionando a diretiva para indicar que este componente é Client-Side

import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";
import { useState } from "react";
import { mockItensCarrinho } from "./mocks/itensCarrinho";
import { Produto } from "./types/produto";
import { ItemCarrinho } from "./types/carrinho";


export default function Produtos() {
  const [quantidadeTotal, setQuantidadeTotal] = useState<number>(
    mockItensCarrinho.reduce((total, item) => total + item.quantidade, 0)
  );
  const [valorTotal, setValorTotal] = useState<number>(
    mockItensCarrinho.reduce((total, item) => total + item.preco * item.quantidade, 0)
  );
  const [listaCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>(mockItensCarrinho);

  // Função para adicionar um produto ao carrinho
  const adicionarAoCarrinho = (produto: Produto) => {
    // Atualizando a quantidade total de itens
    setQuantidadeTotal((prevQuantidade) => prevQuantidade + 1);

    // Atualizando o valor total da compra com o preço do produto
    setValorTotal((prevValor) => prevValor + produto.preco);

    // Verificando se o produto já existe no carrinho
    const produtoExistente = listaCarrinho.find(item => item.id === produto.id);

    if (produtoExistente) {
      // Se o produto já existe, aumentamos sua quantidade
      setItensCarrinho((prevItens) =>
        prevItens.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }  // Aumenta a quantidade
            : item  // Mantém os outros itens inalterados
        )
      );
    } else {
      // Se o produto não existe, criamos um novo item
      const newItemCarrinho: ItemCarrinho = {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: 1, // Quantidade inicial do produto
      };

      // Atualizamos o estado de itens do carrinho, adicionando o novo item
      setItensCarrinho((prevItens) => [...prevItens, newItemCarrinho]);
    }
  };


  return (
    <>
      {/* Passando os estados para o ResumoCarrinho */}
      <ResumoCarrinho valorTotal={valorTotal} quantidadeTotal={quantidadeTotal} />
      {/* Passando a função e os produtos para o ListagemProdutos */}
      <ListagemProdutos adicionarAoCarrinho={adicionarAoCarrinho} />
    </>
  );
}
