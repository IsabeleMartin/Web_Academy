"use client"; // Diretriz para indicar que o componente é do lado do cliente

import { useParams } from "next/navigation"; // Importando o useParams
import { useGetProduto } from "@/app/services/useListaProductos";
import Image from "next/image";

// Função para buscar os detalhes do produto na API

export default function Produto() {
  // Usando useParams para pegar o parâmetro "produto" da URL
  const { produto } = useParams();
  console.log(produto);

  const { produtoGet, isPending, isError } = useGetProduto(String(produto))
  

  // Renderização do componente com base no estado da requisição
  if (isPending) {
    return (
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
              <h5 className="card-title mb-4 fw-bold">Carregando...</h5>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !produtoGet) {
    return (
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
              <h5 className="card-title mb-4 fw-bold">Erro: {isError}</h5>
            </div>
          </div>
        </div>
      </main>
    );
  }


  // Se os dados do produto estiverem carregados corretamente
  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>

            <h5 className="card-title mb-4 fw-bold">{produtoGet.nome}</h5>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
              <Image
                key={produtoGet.id}
                src={produtoGet.fotos[0].src}
                alt={produtoGet.fotos[0].titulo}
                width={300}
                height={320}
              />
            </div>

            <p className="card-text fw-medium">
              Valor: R${Number(produtoGet.preco).toFixed(2)}
            </p>
            <p className="card-text fw-medium">Descrição: {produtoGet.descricao}</p>
            
          </div>
        </div>
      </div>
    </main>
  );
}
