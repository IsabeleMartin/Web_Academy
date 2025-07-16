import { Response, Request } from 'express'

interface Produto {
    id: number;
    name: string;
    price: number;
}
let products: Produto[] = [
    { id: 1, name: "Notebook Acer", price: 1234 },
    { id: 2, name: "Monitor Dell", price: 2000 },
    { id: 3, name: "PC Gamer Dell", price: 4000 },
    { id: 4, name: 'Notebook Acer', price: 1234 },
    { id: 5, name: 'Mouse Logitech', price: 199 },
];


const index = async (req: Request, res: Response) => {
    res.json(products);
}
const create = async (req: Request, res: Response) => {
    const novoProduto: Produto = {
        id: Date.now(), // simples geração de ID
        ...req.body,
    };
    products.push(novoProduto);
    res.status(201).json(novoProduto);
}
const read = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const produto = products.find(p => p.id === id);
    if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    res.json(produto);
}
const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
}
const remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    products = products.filter(p => p.id !== id);
    console.log(products);
    res.status(204).send(); // No Content
}



export default { index, create, read, update, remove };