import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { getAllUsers, findUserByEmail, findUserById, createUser, updateUser, deleteUsuario } from "./usuario.service";
import { CreateUserDto } from "./usuario.types";


const index = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Lista todos os usuários cadastrados.'
    #swagger.responses[200] = {
        description: 'Lista de usuários',
        schema: { type: 'array', items: { $ref: '#/definitions/User' } }
    }
    #swagger.responses[500] = {
        description: 'Erro interno no servidor'
    }
    */

    try {
        const usuarios = await getAllUsers();
        res.json(usuarios);

    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}
async function create(req: Request, res: Response) {
    /*
#swagger.summary = 'Cria um novo usuário.'
#swagger.parameters['body'] = {
    in: 'body',
    description: 'Dados para criação de um novo usuário',
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
    description: 'Usuário criado com sucesso.',
    schema: { $ref: '#/definitions/User' }
}
#swagger.responses[409] = {
    description: 'O e-mail já está em uso.'
}
#swagger.responses[500] = {
    description: 'Erro interno no servidor'
}
*/
    const data = req.body as CreateUserDto;

    try {
        if (!(await findUserByEmail(data.email))) {
            const newUser = await createUser(data);
            console.log("usuario criado");
            res.json(newUser);
        } else {
            return res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
        }
    } catch (err) {
        res.json(err);
    }
}
async function read(req: Request, res: Response) {
    /*
#swagger.summary = 'Obtem detalhes de um usuário pelo ID.'
#swagger.parameters['id'] = {
    in: 'path',
    description: 'ID do usuário',
    required: true,
    type: 'string',
    example: '123'
}
#swagger.responses[200] = {
    description: 'Detalhes do usuário',
    schema: { $ref: '#/definitions/User' }
}
#swagger.responses[404] = {
    description: 'Usuário não encontrado.'
}
*/
    const User = await findUserById(String(req.params.id));
    if (User === null) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: ReasonPhrases.NOT_FOUND })
    }
    console.log(User);
    res.json(User);

}
async function update(req: Request, res: Response) {
    /*
#swagger.summary = 'Atualiza as informações de um usuário.'
#swagger.parameters['id'] = {
    in: 'path',
    description: 'ID do usuário a ser atualizado',
    required: true,
    type: 'string',
    example: '123'
}
#swagger.parameters['body'] = {
    in: 'body',
    description: 'Dados para atualização do usuário',
    required: true,
    schema: {
        type: 'object',
        properties: {
            email: { type: 'string', example: 'novoemail@example.com' },
            password: { type: 'string', example: 'novaSenha123' },
            name: { type: 'string', example: 'Carlos Oliveira' }
        }
    }
}
#swagger.responses[200] = {
    description: 'Usuário atualizado com sucesso.'
}
#swagger.responses[500] = {
    description: 'Erro interno no servidor'
}
*/
    const user = await updateUser(String(req.params.id), req.body);
    console.log(user);
    res.status(StatusCodes.OK).json({ mensagem: ReasonPhrases.OK });
}
async function remove(req: Request, res: Response) {
    /*
 #swagger.summary = 'Remove um usuário pelo ID.'
 #swagger.parameters['id'] = {
     in: 'path',
     description: 'ID do usuário a ser removido',
     required: true,
     type: 'string',
     example: '123'
 }
 #swagger.responses[204] = {
     description: 'Usuário removido com sucesso.'
 }
 #swagger.responses[404] = {
     description: 'Usuário não encontrado.'
 }
 #swagger.responses[500] = {
     description: 'Erro interno no servidor'
 }
 */
    const id = await deleteUsuario(String(req.params.id));
    if (id === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ mensagem: ReasonPhrases.NOT_FOUND });
    }
    res.status(204).send(); // No Content
}



export default { index, create, read, update, remove };
