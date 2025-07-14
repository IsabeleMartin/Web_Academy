import { ItemCarrinho } from "../../types/carrinho";

interface ItemCarrinhoProps {
  key: string;
  item: ItemCarrinho;
}

export function TItemCarrinho({ item }: ItemCarrinhoProps) {
  const valorTotalProduto = (
    precoUnitario: number,
    quantidade: number
  ): number => precoUnitario * quantidade;

  // Garantir que item.preco seja um número válido
  const precoFormatado = isNaN(item.preco) ? 0 : item.preco; // Verificação para garantir que seja um número

  return (
    <tr key={item.id}> {/* Utilizando item.id como chave */}
      <td>{item.nome}</td>
      <td>R$ {precoFormatado.toFixed(2)}</td> {/* Usando precoFormatado */}
      <td>{item.quantidade}</td>
      <td>R$ {valorTotalProduto(precoFormatado, item.quantidade).toFixed(2)}</td>
      <td>
        <button className="btn btn-danger btn-sm">
          Remover
        </button>
      </td>
    </tr>
  );
}
