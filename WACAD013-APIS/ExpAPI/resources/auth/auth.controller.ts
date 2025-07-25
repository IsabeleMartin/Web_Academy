import { findUserByEmail, createUser } from "../user/usuario.service";
import { UserTypes } from "../userType/userType.constants";
import { LoginDto, SignUpDto } from './auth.types'
import { Request, Response } from 'express';
import { checkAuth } from "./auth.service";

const signup = async (req: Request, res: Response) => {
    /*
#swagger.summary = 'Realiza o cadastro de um novo usuário.'
#swagger.description = 'Esse endpoint cria um novo usuário, verificando se o e-mail já está em uso antes de prosseguir com o cadastro.'
#swagger.parameters['body'] = {
    in: 'body',
    description: 'Dados necessários para o cadastro de um novo usuário',
    required: true,
    schema: {
        type: 'object',
        properties: {
            email: { type: 'string', example: 'usuario@example.com' },
            password: { type: 'string', example: 'senha123' },
            name: { type: 'string', example: 'João Silva' }
        }
    }
}
#swagger.responses[200] = {
    description: 'Usuário cadastrado com sucesso.',
    schema: { $ref: '#/definitions/User' }
}
#swagger.responses[400] = {
    description: 'O email informado já está sendo utilizado.',
}
#swagger.responses[500] = {
    description: 'Erro interno no servidor.',
}
*/
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
    /*
   #swagger.summary = 'Realiza o login de um usuário.'
   #swagger.description = 'Esse endpoint autentica um usuário com base no email e senha fornecidos.'
   #swagger.parameters['body'] = {
       in: 'body',
       description: 'Credenciais do usuário para login',
       required: true,
       schema: {
           type: 'object',
           properties: {
               email: { type: 'string', example: 'usuario@example.com' },
               password: { type: 'string', example: 'senha123' }
           }
       }
   }
   #swagger.responses[200] = {
       description: 'Usuário autenticado com sucesso.',
   }
   #swagger.responses[401] = {
       description: 'Email ou senha incorretos.',
   }
   #swagger.responses[500] = {
       description: 'Erro interno no servidor.',
   }
   */
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
    /*
    #swagger.summary = 'Realiza o logout de um usuário.'
    #swagger.description = 'Esse endpoint encerra a sessão do usuário e o desloga do sistema.'
    #swagger.responses[200] = {
       description: 'Usuário deslogado com sucesso.',
    }
    #swagger.responses[500] = {
       description: 'Erro interno no servidor.',
    }
    */
    try {
        req.session.uid = ""
        req.session.tipoUsuario = ""
        res.send("usuário deslogado")
    } catch (e: any) {
        res.status(500).json(e.errors);
    }
};


export default { signup, login, logout };