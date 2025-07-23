import { findUserByEmail, createUser } from "../user/usuario.service";
import { UserTypes } from "../userType/userType.constants";
import { LoginDto, SignUpDto } from './auth.types'
import { Request, Response } from 'express';
import { checkAuth } from "./auth.service";

const signup = async (req: Request, res: Response) => {
    const usuario: SignUpDto = req.body as unknown as SignUpDto;
    try {
        if (await findUserByEmail(usuario.email))
            return res.status(400).json({ msg: 'Email informado já está sendo usado' });
        const newUsuario = await createUser({
            ...usuario,
            userTypeId: UserTypes.CLIENT,
        });
        res.status(201).json(newUsuario);
    } catch (e: any) {
        res.status(500).json(e.errors);
    }
};


const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const usuario = await checkAuth({ email, password });
        if (!usuario)
            return res.status(401).json({
                msg: 'Email e/ou senha incorretos'
            });
        req.session.uid = usuario.id;
        req.session.tipoUsuario = usuario.userTypeId;
        res.status(200).json({ msg: 'Usuário autenticado' });
    } catch (e) {
        res.status(500).json(e);
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        req.session.uid = ""
        req.session.tipoUsuario = ""
        res.send("usuário deslogado")
    } catch (e: any) {
        res.status(500).json(e.errors);
    }
};


export default { signup, login, logout };