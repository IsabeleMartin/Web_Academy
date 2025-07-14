import { Produto } from "../../types/produto";
import Image from "next/image";

interface ICardProdutoProps {
  produto: Produto;
  adicionarAoCarrinho: (produto: Produto) => void;
}

export default function CardProduto({ produto, adicionarAoCarrinho }: ICardProdutoProps) {
  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={produto.fotos[0].src}
          className="card-img-top"
          alt={produto.fotos[0].titulo}
          width={300}
          height={320}
        />

        <div className="card-body bg-light">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text text-secondary">R$ {produto.preco}</p>
          <button
            className="btn btn-dark d-block w-100"
            type="button"
            onClick={() => adicionarAoCarrinho(produto)}
          >
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
