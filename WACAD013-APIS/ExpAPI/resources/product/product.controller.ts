import { Response, Request } from 'express'
import { ProdCreateDto } from "./product.types"
import { createProduct, productAlreadyExists, getAllProducts, getProduct, updateProduct, removeProduct } from './product.service';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';



const index = async (req: Request, res: Response) => {
   /*
    #swagger.summary = 'Lista os produtos cadastrados.'
    #swagger.responses[200] = {
        description: 'Produtos listados com sucesso.',
        schema: { $ref: '#/definitions/Product' }
    }
    */
    const products = await getAllProducts();
    res.json(products);
}
async function create(req: Request, res: Response) {
    /*
        #swagger.summary = 'Adiciona um novo produto na base.'
        #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateProductDto' }
        }
        #swagger.responses[200] = {
        schema: { $ref: '#/definitions/Product' }
        }
    */
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
    /*
    #swagger.summary = 'Recupera dados de um produto específico.'
    #swagger.parameters['id'] = { description: 'ID do produto' }
    #swagger.responses[200] = {
    schema: { $ref: '#/definitions/Product' }
    }
    */
    const produto = await getProduct(String(req.params.id));
    if (produto === null) {

        return res.status(StatusCodes.NOT_FOUND).json({ mensagem: ReasonPhrases.NOT_FOUND });
    }
    console.log(produto);
    res.json(produto);
}
const update = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Atualiza os dados de um produto específico.'
    #swagger.parameters['id'] = { description: 'ID do produto' }
    #swagger.responses[200] = {
    schema: { $ref: '#/definitions/Product' }
    }
    */
    const product = await updateProduct(String(req.params.id), req.body);
    console.log(product);
    res.status(StatusCodes.OK).json({ mensagem: ReasonPhrases.OK });
}
const remove = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Remove  um produto específico.'
    #swagger.parameters['id'] = { description: 'ID do produto' }
    #swagger.responses[200] = {
    schema: { $ref: '#/definitions/Product' }
    }
    */
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