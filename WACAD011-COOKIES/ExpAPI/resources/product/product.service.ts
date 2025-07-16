import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();


async function getUsers(){
  const criteria = {
    where: {
        email: {
            contains: "gmail.com",
        }
    }
}
const users: User[] = await prisma.user.findMany(criteria)


}

