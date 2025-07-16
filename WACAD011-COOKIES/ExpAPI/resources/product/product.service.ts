// Arquivo src/resources/product/product.service.ts
import { PrismaClient, Product } from '@prisma/client';
import { ProdCreateDto } from './product.types';

const prisma = new PrismaClient();

export async function getAllProducts(): Promise<Product[]> {
    return await prisma.product.findMany();
}

export async function createProduct(product: ProdCreateDto): Promise<Product | null> {
    try {
        const produto = await prisma.product.create({ data: product });
        console.log(produto); // Verifique se o produto foi criado corretamente
        return produto; // Retorne o produto criado
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        return null; // Caso haja um erro, retorna null ou outro valor indicativo
    }
}


// Além das funções mostradas, o serviço de products precisa ter funções como:
export async function productAlreadyExists(name2find: string): Promise<boolean> {
    const produto = await prisma.product.findMany({where:{ name : name2find}});
    if(produto.length > 0){
        console.log(produto);
        return true }
    else{
        console.log("not exist");
        return false
    }
}
//const getProduct = async (id: string): Promise<Product>
//const updateProduct = async (id: string, product: ProductCreateDto):
//Promise<[affectedCount: number]>
//const removeProduct = async (id: string): Promise<number>