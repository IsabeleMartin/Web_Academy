import {Request} from 'express'
import { CompraListDto } from './compra.types';
import { promises } from 'dns';

export async function contemCarrinho(req: Request, productI: string): Promise<Boolean>{
    const carrinho: CompraListDto[] = req.session.carrinho || [];
    const product = carrinho.find(item => item.produtoId === productI);
    if(product) return true;
    else return false
}

export async function addQuantCarrinho(req: Request, produto: CompraListDto): Promise<Boolean>{
    const carrinho: CompraListDto[] = req.session.carrinho || [];
    const prodCar = carrinho.find(item=>item.produtoId === produto.produtoId)
    if(prodCar){
        prodCar.quantidade += produto.quantidade;
        return true
    }else return false
    
    
}

export async function createProdCarrinho(req:Request, produto: CompraListDto): Promise<void>  {
    const carrinho: CompraListDto[] = req.session.carrinho || [];
    carrinho.push(produto);
    
   
        
}