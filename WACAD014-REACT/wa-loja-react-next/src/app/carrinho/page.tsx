"use client";
import { useRouter } from "next/router"; // Importando useRouter para pegar query

import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import ResumoCarrinho from "../components/ResumoCarrinho/ResumoCarrinho";

export default function Carrinho() {
  const router = useRouter();

  // Pegando os valores da query string
  const { valorTotal, quantidadeTotal } = router.query;

  // Garantir que os valores sejam números (já que query vem como string)
  const valorTotalNum = valorTotal ? parseFloat(valorTotal as string) : 0;
  const quantidadeTotalNum = quantidadeTotal ? parseInt(quantidadeTotal as string, 10) : 0;

  return (
    <>
      {/* Passando os valores para ResumoCarrinho e ListagemCarrinho */}
      <ResumoCarrinho valorTotal={valorTotalNum} quantidadeTotal={quantidadeTotalNum} />
      <ListagemCarrinho />
    </>
  );
}
