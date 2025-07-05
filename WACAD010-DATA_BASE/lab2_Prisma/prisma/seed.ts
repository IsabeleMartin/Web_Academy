import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cliente = await prisma.cliente.create({
    data: {
      nome_completo: "João Silva",
      cpf: "123.456.789-00",
      celular: "(11) 98765-4321",
      email: "joao.silva@email.com",
      data_nascimento: new Date('1985-10-10'),
    },
  });

  console.log(cliente);
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
