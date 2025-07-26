

import { Produto } from "@/app/types/produto";
import ItemFavorito from "../ItemFavorito/ItemFavorito";

interface IListagemFavoritoProps {
  itensFavoritos: Produto[];
  refetchFavoritos: () => void;
}

export default function ListagemFavoritos({itensFavoritos, refetchFavoritos}:IListagemFavoritoProps) {

  
    

  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-bold">Lista de favoritos:</h5>

        {itensFavoritos.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {itensFavoritos.map((item) => (
                  <ItemFavorito
                    key={item.id}
                    itemFavorito={item}
                    refetchFavoritos={refetchFavoritos}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Sua lista de favoritos está vazia.</p>
        )}
      </div>
      {/* <div className="card-footer d-flex flex-column">
        <small className="text-muted">
          Quantidade de produtos: {itensFavoritos.length}
        </small>

        <small className="text-muted">
          Valor total: R$ {}
        </small>
      </div> */}
    </div>
  );
}