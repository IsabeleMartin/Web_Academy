import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import Image from "next/image";
import { useContext } from "react";
import { FavoritosContext } from "@/app/contextos/FavoritoContexto";

interface CardProdutoProps {
  produto: Produto;
  mostrarImagem?: boolean;
  mostrarBotao?: boolean;
}

export default function CardProduto({
  produto,
  mostrarImagem = true,
  mostrarBotao = true,
}: CardProdutoProps) {

  const {favoritos, setFavoritos} = useContext(FavoritosContext);
  
  const adicionarAosFavoritos = (produto: Produto) => {
    if (!favoritos.some((item) => item.id === produto.id)) {
      setFavoritos((prevFavoritos) => ([...prevFavoritos, produto]));
    }
  };

  const ehFavorito = favoritos.some((item) => item.id === produto.id);

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        {mostrarImagem ? (
          <Image
            src={produto.fotos[0].src}
            className="card-img-top"
            alt={produto.fotos[0].titulo}
            width={150}
            height={180}
          />
        ) : null}

        <div className="card-body bg-ligth">
          <span className="badge text-bg-success text-white mb-2 ">
            {produto.desconto}% de desconto
          </span>

          <h5 className="card-title fw-bold">{produto.nome}</h5>
          <span className="text-secondary">De R$ {produto.preco}</span>
          <h5 className="card-text">
            Por R${" "}
            {calculaValorComPorcentagemDeDesconto(
              Number(produto.preco),
              produto.desconto
            )}
          </h5>
          {mostrarBotao ? (
            <button
              className={
                ehFavorito
                  ? "btn btn-success d-block w-100"
                  : "btn btn-secondary d-block w-100"
              }
              type="button"
              onClick={() => adicionarAosFavoritos(produto)}
              disabled={ehFavorito}
            >
              {ehFavorito ? "Favoritado" : "Favoritar"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
