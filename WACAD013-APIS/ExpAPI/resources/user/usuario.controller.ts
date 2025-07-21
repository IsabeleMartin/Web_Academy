import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { getAllUsers, findUserByEmail, findUserById, createUser, updateUser, deleteUsuario } from "./usuario.service";
import { CreateUserDto } from "./usuario.types";


const index = async (req: Request, res: Response) => {
    try {
        const usuarios = await getAllUsers();
        res.json(usuarios);

    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}
async function create(req: Request, res: Response) {
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
    const User = await findUserById(String(req.params.id));
    if (User === null) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: ReasonPhrases.NOT_FOUND })
    }
    console.log(User);
    res.json(User);

}
async function update(req: Request, res: Response) {
    const user = await updateUser(String(req.params.id), req.body);
    console.log(user);
    res.status(StatusCodes.OK).json({ mensagem: ReasonPhrases.OK });
}
async function remove(req: Request, res: Response) {
    const id = await deleteUsuario(String(req.params.id));
    if (id === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ mensagem: ReasonPhrases.NOT_FOUND });
    }
    res.status(204).send(); // No Content
}



export default { index, create, read, update, remove };
