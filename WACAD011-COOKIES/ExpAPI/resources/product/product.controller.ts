import { Response, Request } from 'express'
import { ProdCreateDto} from "./product.types"
import { createProduct, productAlreadyExists } from './product.service';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Decimal } from '@prisma/client/runtime/library';


let products: ProdCreateDto[] = [
    {id:"1", name: "Notebook Acer", price: new Decimal(1234.5), stockQuantity: 3 },
    {id: "2", name: "Monitor Dell", price: new Decimal(2000.5), stockQuantity: 4 },
    {id: "3", name: "PC Gamer Dell", price: new Decimal(4000.5), stockQuantity: 8 },
    {id: "4", name: 'Notebook Acer', price: new Decimal(1234.5), stockQuantity: 5 },
    {id: "5", name: 'Mouse Logitech', price: new Decimal(199.5), stockQuantity: 2 },
];



const index = async (req: Request, res: Response) => {
    res.json(products);
}
const create = async (req: Request, res: Response) => {
    const newProduct = req.body as ProdCreateDto;

    try {
        if (!(await productAlreadyExists(newProduct.name))) {
            const product = await createProduct(newProduct);
            console.log("criou o produto")
            res.status(StatusCodes.OK).json(product);
        } else {
            console.log("not criou o produto")
            res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
        }
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const read = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const produto = products.find(p => p.id === id);
    if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    res.json(produto);
}
const update = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
}
const remove = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    products = products.filter(p => p.id !== id);
    console.log(products);
    res.status(204).send(); // No Content
}



export default { index, create, read, update, remove };