interface ResumoCarrinhoProps {
  valorTotal: number;
  quantidadeTotal: number;
}

export default function ResumoCarrinho({ valorTotal, quantidadeTotal }: ResumoCarrinhoProps) {
  // Garantindo que valorTotal seja um número válido
  const valorTotalFormatado = isNaN(valorTotal) ? 0 : valorTotal;
  const quantidadeTotalFormatada = isNaN(quantidadeTotal) ? 0 : quantidadeTotal;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
        <p className="card-text fw-medium">Quantidade total: {quantidadeTotalFormatada}</p>
        <p className="card-text fw-medium">
          Valor total: R${valorTotalFormatado.toFixed(2)} {/* Verificando se valorTotal não é NaN */}
        </p>
      </div>
    </div>
  );
}
