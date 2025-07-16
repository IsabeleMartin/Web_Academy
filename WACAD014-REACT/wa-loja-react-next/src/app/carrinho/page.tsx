"use client"; 
import { useEffect, useState } from "react";
import { mockItensCarrinho } from "../mocks/itensCarrinho"; // Lista de elementos do carrinho 
import { ItemCarrinho } from "../types/carrinho";
import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import ResumoCarrinho from "../components/ResumoCarrinho/ResumoCarrinho";

export default function Carrinho() {
  // Estados para quantidade total e valor total
  const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);
  const [valorTotal, setValorTotal] = useState<number>(0);
  
  // Estado para armazenar os itens do carrinho
  const [listaCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>(mockItensCarrinho);

  // Função para remover um item do carrinho
  const removerItemDoCarrinho = (id: string) => {
    const produtoExistente = listaCarrinho.find(item => item.id === id);

    if (produtoExistente) {
      if (produtoExistente.quantidade > 1) {
        setItensCarrinho((prevItens) =>
          prevItens.map((item) =>
            item.id === id
              ? { ...item, quantidade: item.quantidade - 1 }  // Decrementa a quantidade
              : item
          )
        );
      } else {
        setItensCarrinho((prevItens) =>
          prevItens.filter((item) => item.id !== id)  // Remove o item
        );
      }
    }
  };

  // Recalculando totais (quantidade total e valor total)
  useEffect(() => {
    let totalQuantidade = 0;
    let totalValor = 0;

    listaCarrinho.forEach((item) => {
      totalQuantidade += item.quantidade;
      totalValor += item.preco * item.quantidade;
    });

    setQuantidadeTotal(totalQuantidade);
    setValorTotal(totalValor);
  }, [listaCarrinho]);  // Agora, recalcula sempre que a lista de itens mudar

  return (
    <>
      {/* Passando os valores para ResumoCarrinho e ListagemCarrinho */}
      <ListagemCarrinho
        itensCarrinho={listaCarrinho}
        removerItemDoCarrinho={removerItemDoCarrinho}
      />
      <ResumoCarrinho valorTotal={valorTotal} quantidadeTotal={quantidadeTotal} />
    </>
  );
}
