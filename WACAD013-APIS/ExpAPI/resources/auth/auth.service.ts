import { PrismaClient, User } from '@prisma/client';
import { LoginDto } from './auth.types';
import bcrypt from 'bcryptjs';
import { boolean, string } from 'joi';


const prisma = new PrismaClient();

export const checkAuth = async (
    credenciais: LoginDto,
): Promise<User | undefined> => {
    const { email, password } = credenciais;
    const usuario = await prisma.user.findUnique({ where: { email } });
    if (!usuario) return undefined;
    const ok = await bcrypt.compare(password, usuario.password);
    if (ok) return usuario
    else return undefined
}

export const checkIsAdmin = async (idUser: string) => {
    const typeUser = await prisma.user.findFirst({ where: { id: idUser } });
    if (typeUser?.userTypeId === "d90171c9-a589-4883-a0bb-027a32e0be23") return true
    else return false
}

export const checkIsAuth = async (idUser: string) => {
    const user = await prisma.user.findFirst({where: {id: idUser}});
    if (user) return true
    else false
}