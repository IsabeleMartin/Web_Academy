import { ItemCarrinho } from "../../types/carrinho";
import { TItemCarrinho } from "../TItemCarrinho/TItemCarrinho"

interface ListagemCarrinhoProps {
  itensCarrinho: ItemCarrinho[];
  removerItemDoCarrinho: (id: string) => void;
}

export default function ListagemCarrinho({itensCarrinho, removerItemDoCarrinho}: ListagemCarrinhoProps) {
   
    return (
        <div className="container p-5">
            <div className="card mb-4">
                <div className="row card-body">
                    <h5 className="card-title mb-4 fw-light">
                        Produtos selecionados
                    </h5>
                    <div className="table-responsive">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Valor Unitário</th>
                                    <th>Quantidade</th>
                                    <th>Valor Total</th>
                                    <th>Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itensCarrinho.map((item) => (
                                    <TItemCarrinho 
                                        key={item.id}
                                        item={item}
                                        removerItemDoCarrinho={removerItemDoCarrinho}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    )
}