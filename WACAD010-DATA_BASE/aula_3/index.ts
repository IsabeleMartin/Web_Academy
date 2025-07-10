import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Função para Criando um cliente
async function createCliente() {
  const cliente = await prisma.cliente.create({
    data: {
      nome_completo: 'Isabele Martins',
      cpf: '011.971.912-68',
      celular: '996095099',
      email: 'isabele@exemplo.com',
      data_nascimento: new Date('2002-09-25T00:00:00.000Z'),
    },
  })

  console.log('Cliente criado:', cliente)
  return cliente
}

// Função para Criando um endereço para o cliente
async function createEndereco(clienteId: number) {
  const endereco = await prisma.endereco.create({
    data: {
      id_cliente: clienteId,
      logradouro: 'Avenida Brasil',
      numero: '456',
      complemento: 'Bloco A',
      bairro: 'Centro',
      cidade: 'Manaus',
      estado: 'AM',
      cep: '69000-111',
    },
  })

  console.log('Endereço criado:', endereco)
  return endereco
}

// Função para Criando um produto
async function createProduto(subcategoriaId: number) {
  const produto = await prisma.produto.create({
    data: {
      modelo: 'Smartphone X1',
      fabricante: 'Fabricante Exemplo',
      preco_base: 1500.0,
      quantidade_disponivel: 100,
      id_subcategoria: subcategoriaId,
    },
  })

  console.log('Produto criado:', produto)
  return produto
}

// Função para verificar se o produto existe
async function getProdutoById(produtoId: number) {
  const produto = await prisma.produto.findUnique({
    where: { id_produto: produtoId },
  })
  return produto
}

// Função para Criando uma compra associada ao cliente, endereço e produto
async function createCompra(clienteId: number, enderecoId: number, produtoId: number) {
  // Busca o produto no banco de dados
  const produto = await prisma.produto.findUnique({
    where: { id_produto: produtoId },
  })

  if (!produto) {
    console.log('Erro: Produto não encontrado.')
    return
  }

  // Calcula o total com base no preço do produto e quantidade
  const quantidade = 1
  const precoUnitario = Number(produto.preco_base)
  const totalCompra = precoUnitario * quantidade
  const desconto = 10.5
  const totalComDesconto = totalCompra - desconto

  // Cria a compra com os dados reais do produto
  const compra = await prisma.compra.create({
    data: {
      id_cliente: clienteId,
      data_hora: new Date(),
      desconto_aplicado: desconto,
      forma_pagamento: 'Cartão de Crédito',
      total: totalComDesconto,
      id_endereco_envio: enderecoId,
      itens_compra: {
        create: [
          {
            id_produto: produtoId,
            quantidade: quantidade,
            preco_unitario: precoUnitario,
          },
        ],
      },
    },
  })

  console.log('Compra criada:', compra)
  return compra
}


// Função para consultar compras (leitura)
async function getCompras() {
  const compras = await prisma.compra.findMany({
    include: {
      cliente: true, // Incluir os dados do cliente
      endereco_envio: true, // Incluir o endereço de envio
      itens_compra: {
        include: {
          produto: true, // Incluir os produtos da compra
        },
      },
    },
  })

  console.log('Compras encontradas:', compras)
  return compras
}

async function deleteItemCompra(id_compra: number, id_produto: number) {
  // 1. Verificar se o item existe
  const item = await prisma.itemCompra.findUnique({
    where: {
      id_compra_id_produto: {
        id_compra,
        id_produto,
      },
    },
  });

  if (!item) {
    console.log('Item não encontrado na compra.');
    return null;
  }

  // 2. Se a quantidade for maior que 1, apenas decrementa
  if (item.quantidade > 1) {
    const itemAtualizado = await prisma.itemCompra.update({
      where: {
        id_compra_id_produto: {
          id_compra,
          id_produto,
        },
      },
      data: {
        quantidade: item.quantidade - 1,
      },
    });

    console.log('Quantidade do item reduzida:', itemAtualizado);
  } else {
    // 3. Se a quantidade for 1, remove o item da compra
    await prisma.itemCompra.delete({
      where: {
        id_compra_id_produto: {
          id_compra,
          id_produto,
        },
      },
    });

    console.log('Item da compra removido.');
  }

  // 4. Atualiza o total da compra
  const itensCompra = await prisma.itemCompra.findMany({
    where: { id_compra },
  });

  let totalBruto = 0;
  for (let item of itensCompra) {
    totalBruto += Number(item.quantidade) * Number(item.preco_unitario);
  }

  const compra = await prisma.compra.findUnique({
    where: { id_compra },
    select: { desconto_aplicado: true },
  });

  const desconto = Number(compra?.desconto_aplicado) || 0;
  const totalComDesconto = totalBruto - desconto;

  const compraAtualizada = await prisma.compra.update({
    where: { id_compra },
    data: { total: totalComDesconto },
  });

  console.log('Total da compra atualizado:', compraAtualizada);
  return compraAtualizada;
}


async function updateItemCompra(
  id_compra: number,
  id_produto: number,
  novaQuantidade: number,
) {
  // 1. Verificar se o item de compra existe
  const itemExistente = await prisma.itemCompra.findUnique({
    where: {
      id_compra_id_produto: {
        id_compra,
        id_produto,
      },
    },
  });

  if (!itemExistente) {
    console.log('Erro: Item de compra não encontrado!');
    return;
  }

  // 2. Atualizar o item de compra
  const itemAtualizado = await prisma.itemCompra.update({
    where: {
      id_compra_id_produto: {
        id_compra,
        id_produto,
      },
    },
    data: {
      quantidade: novaQuantidade,
    },
  });

  console.log('Item de compra atualizado:', itemAtualizado);

  // 3. Buscar a compra para pegar o desconto atual
  const compra = await prisma.compra.findUnique({
    where: { id_compra },
    select: { desconto_aplicado: true },
  });

  const desconto = Number(compra?.desconto_aplicado) || 0;

  // 4. Buscar todos os itens da compra
  const itensCompra = await prisma.itemCompra.findMany({
    where: { id_compra },
  });

  // 5. Calcular o total bruto
  let totalBruto = 0;
  for (let item of itensCompra) {
    const quantidade = Number(item.quantidade);
    const precoUnitario = Number(item.preco_unitario);
    totalBruto += quantidade * precoUnitario;
  }

  // 6. Aplicar o desconto (assumindo que é valor fixo, não percentual)
  const totalComDesconto = totalBruto - desconto;

  // 7. Atualizar o total na tabela Compra
  const compraAtualizada = await prisma.compra.update({
    where: { id_compra },
    data: { total: totalComDesconto },
  });

  console.log('Total da compra atualizado:', compraAtualizada);

  return compraAtualizada;
}




// Função principal para teste
async function main() {
  // Criando categoria 
  const categoria = await prisma.categoria.create({
    data: {
      nome: 'Eletrônicos',
    },
  })

  // Criando subcategoria
  const subcategoria = await prisma.subcategoria.create({
    data: {
      nome: 'Celulares',
      id_categoria: categoria.id_categoria,
    },
  })

  // Criando produto
  const produto = await createProduto(subcategoria.id_subcategoria)

  // Criando cliente
  const cliente = await createCliente()

  // Criando endereço para o cliente

  const endereco = await createEndereco(cliente.id_cliente)

  // Tente Criando uma compra associando o cliente, o endereço e o produto
  await createCompra(cliente.id_cliente, endereco.id_endereco, produto.id_produto)


  const idCompra = 1;   
  const idProduto = 1;  

  const novaQuantidade = 3; 


  // Chama a função para atualizar o item de compra
  await updateItemCompra(idCompra, idProduto, novaQuantidade);

  // Chama a função para deletar o item de compra
  await deleteItemCompra(idCompra, idProduto);

  // Ler as compras
  await getCompras()
}

main().catch(e => {
  console.error(e)
  prisma.$disconnect()
})
