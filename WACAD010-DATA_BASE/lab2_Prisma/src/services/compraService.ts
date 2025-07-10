import { prisma } from '../prisma/client';

export async function criarCompra(dados: {
  id_cliente: number;
  id_endereco_envio: number;
  forma_pagamento: string;
  desconto_aplicado?: number;
  itens: { id_produto: number; quantidade: number }[];
}) {
  const produtos = await Promise.all(
    dados.itens.map(async item => {
      const produto = await prisma.produto.findUnique({
        where: { id_produto: item.id_produto },
      });
      if (!produto || produto.quantidade_disponivel < item.quantidade) {
        throw new Error(`Produto ${item.id_produto} indisponível`);
      }
      return { ...item, preco_unitario: produto.preco_base };
    })
  );

  const total = produtos.reduce((sum, item) => {
    return sum + item.preco_unitario.toNumber() * item.quantidade;
  }, 0);

  return await prisma.compra.create({
    data: {
      id_cliente: dados.id_cliente,
      id_endereco_envio: dados.id_endereco_envio,
      data_hora: new Date(),
      forma_pagamento: dados.forma_pagamento,
      desconto_aplicado: dados.desconto_aplicado ?? 0,
      total,
      itens_compra: {
        create: produtos.map(item => ({
          id_produto: item.id_produto,
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario,
        })),
      },
    },
  });
}
