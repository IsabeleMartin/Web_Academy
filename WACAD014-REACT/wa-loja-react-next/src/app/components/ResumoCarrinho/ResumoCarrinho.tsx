interface ResumoCarrinhoProps {
  valorTotal: number;
  quantidadeTotal: number;
}

const ResumoCarrinho: React.FC<ResumoCarrinhoProps> = ({ valorTotal, quantidadeTotal }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
        <p className="card-text fw-medium">Quantidade total: {quantidadeTotal}</p>
        <p className="card-text fw-medium">
          Valor total: R${valorTotal} {/* Verificando se valorTotal não é NaN */}
        </p>
      </div>
    </div>
  );
}

export default ResumoCarrinho;