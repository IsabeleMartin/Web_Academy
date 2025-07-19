import { Response, Request } from 'express'
import { ProdCreateDto } from "./product.types"
import { createProduct, productAlreadyExists, getAllProducts, getProduct, updateProduct, removeProduct } from './product.service';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Decimal } from '@prisma/client/runtime/library';



const index = async (req: Request, res: Response) => {
    const products = await getAllProducts();
    res.json(products);
}
async function create(req: Request, res: Response) {
    const product = req.body;
    try {
        if (await productAlreadyExists(product.name)) {
            return res.status(400).json({ msg: 'Produto já existe' });
        }
        const newProduct = await createProduct(product);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}

const read = async (req: Request, res: Response) => {
    const produto = await getProduct(String(req.params.id));
    if (produto === null) {

        return res.status(StatusCodes.NOT_FOUND).json({ mensagem: ReasonPhrases.NOT_FOUND });
    }
    console.log(produto);
    res.json(produto);
}
const update = async (req: Request, res: Response) => {
    const product = await updateProduct(String(req.params.id), req.body);
    console.log(product);
    res.status(StatusCodes.OK).json({ mensagem: ReasonPhrases.OK });
}
const remove = async (req: Request, res: Response) => {
    const id = await removeProduct(String(req.params.id));
    if (id === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ mensagem: ReasonPhrases.NOT_FOUND });
    }
    const products = await getAllProducts();
    console.log("Produto removido com sucesso");
    console.log("Lista de produtos atualizada:");
    console.log(products);
    res.status(204).send(); // No Content
}



export default { index, create, read, update, remove };