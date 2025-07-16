import { Response, Request } from 'express'
const index = async (req: Request, res: Response) => {
    const produtos = [
        { id: 1, name: "Notebook Acer", price: 1234 },
        { id: 2, name: "Monitor Dell", price: 2000 },
        { id: 3, name: "PC Gamer Dell", price: 4000 }
    ];
    res.json(produtos);
}
const create = async (req: Request, res: Response) => {

}
const read = async (req: Request, res: Response) => {
    const productId = req.params.id;
    res.end(productId)
}
const update = async (req: Request, res: Response) => {

}
const remove = async (req: Request, res: Response) => {

}



export default { index, create, read, update, remove };