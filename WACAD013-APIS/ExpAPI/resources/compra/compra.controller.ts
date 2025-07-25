import { Response, Request } from "express";
import { CompraListDto } from "./compra.types";
import { contemCarrinho , addQuantCarrinho, createProdCarrinho} from "./compra.service";
import { PrismaClient } from "@prisma/client";
import { date } from "joi";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

const adicionarProduto = async (req: Request, res: Response) => {
      /*
    #swagger.summary = 'Adiciona um produto ao carrinho.'
    #swagger.description = 'Esse endpoint verifica se o produto já está no carrinho. Se estiver, aumenta a quantidade, caso contrário, adiciona o produto ao carrinho.'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Produto a ser adicionado ao carrinho',
        required: true,
        schema: {
            type: 'object',
            properties: {
                produtoId: { type: 'integer', example: 123 },
                quantidade: { type: 'integer', example: 2 }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Produto adicionado ou quantidade atualizada no carrinho.',
    }
    #swagger.responses[500] = {
        description: 'Erro interno no servidor.',
    }
    */
   const produto: CompraListDto = req.body;
   if (!req.session.carrinho) {
    console.log("não existe carrinho");
      req.session.carrinho = [];  // Cria um carrinho vazio se não existir
   }
   if(await contemCarrinho(req, produto.produtoId)){
    await addQuantCarrinho(req, produto);
    res.status(200).json({msg:'Produto adicionando'});
   }
   else{
    await createProdCarrinho(req, produto)
    res.status(200).json({msg:'Produto adicionando'});
   }
};


const finalizarCompra = async (req: Request, res: Response) => {
     /*
    #swagger.summary = 'Finaliza a compra e cria a transação.'
    #swagger.description = 'Esse endpoint cria uma nova compra com os itens do carrinho e a associa ao usuário logado.'
    #swagger.responses[200] = {
        description: 'Compra finalizada com sucesso.',
    }
    #swagger.responses[400] = {
        description: 'Carrinho vazio ou erro na criação da compra.',
    }
    #swagger.responses[500] = {
        description: 'Erro interno no servidor.',
    }
    */
    const userId = req.session.uid;
    const carrinho = req.session. carrinho;
    let compra, itemCompra;
    if(userId){
        compra = await prisma.compra.create({data: {
            userId,
            createdAt: new Date(),
    
        }})

    }

    if(compra && carrinho){
        const produtoId = carrinho[0].produtoId;
        const quantidade = carrinho[0].quantidade;
        const compraId = compra.id;
        itemCompra = await prisma.itemCompra.create({data:{
            produtoId: produtoId,
            quantidade: quantidade,
            compraId: compraId,
        }})
        res.status(200).json({msg: "compra feita"});

    }
    
    console.log("compra",compra,"itemCompra", itemCompra);

}

export {adicionarProduto, finalizarCompra}
