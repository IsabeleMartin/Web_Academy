// // , createUser,
// updateUser, findUserByEmail, findUserById e deleteUsuario
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto, UserDto } from './usuario.types';
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

export async function getAllUsers(): Promise<UserDto[]> {
    return prisma.user.findMany();
}


export async function createUser(user: CreateUserDto): Promise<UserDto | undefined> {
    try {
     
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt );
        const newuser = await prisma.user.create({ data: {...user, password: hash,} });
        console.log(newuser);
        return newuser;
    } catch (err) {

        console.log(err);
    }
}

export async function updateUser(id: string, user: UpdateUserDto): Promise<number> {
    try {
        const affectedCount = await prisma.user.updateMany({
            where: { id: id },  // Condição para encontrar o produto pelo id
            data: user,      // Dados para atualizar
        });

        return affectedCount.count;  // Retorna o número de registros afetados
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        throw new Error("Erro ao atualizar produto");
    }
};



export async function findUserByEmail(email: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({ where: { email: email } });
    return user;
}


export async function findUserById(id: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({ where: { id: id } });
    return user;
}


export async function deleteUsuario(id: string): Promise<number> {
    try {
        const affectedCount = await prisma.user.deleteMany({
            where: { id: String(id) },  // Condição para encontrar o produto pelo id
        });

        return affectedCount.count;  // Retorna o número de registros afetados
    } catch (error) {
        console.error("Erro ao remover produto:", error);
        throw new Error("Erro ao remover produto");
    }
}