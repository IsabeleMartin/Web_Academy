import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import ItemFavorito from "../ItemFavorito/ItemFavorito";
import { useContext } from "react";
import { FavoritosContext } from "../../contextos/FavoritoContexto";

interface IListagemFavoritosProps {
  produtosFavoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export default function ListagemFavoritos() {
  const {favoritos, setFavoritos} = useContext(FavoritosContext)
  const valorTotalFavoritos = favoritos.reduce((acc, produto) => {
    return (
      acc +
      calculaValorComPorcentagemDeDesconto(
        Number(produto.preco),
        produto.desconto
      )
    );
  }, 0);

  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-bold">Lista de favoritos:</h5>

        {favoritos.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Desconto</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {favoritos.map((item) => (
                  <ItemFavorito
                    key={item.id}
                    itemFavorito={item}
                    setFavoritos={setFavoritos}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Sua lista de favoritos está vazia.</p>
        )}
      </div>
      <div className="card-footer d-flex flex-column">
        <small className="text-muted">
          Quantidade de produtos: {favoritos.length}
        </small>

        <small className="text-muted">
          Valor total: R$ {valorTotalFavoritos}
        </small>
      </div>
    </div>
  );
}
