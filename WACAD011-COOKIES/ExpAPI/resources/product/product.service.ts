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
    try {
        const produto = await prisma.product.findMany({ where: { name: name2find } });
        if (produto.length > 0) {
            console.log(produto);
            return true
        }
        else {
            console.log(false);
            return false
        }
    } catch (error) {
        console.log("Erro ao verificar se o produto existe:", error);
        return false; // Em caso de erro, assume-se que o produto não existe
    }
}
export async function getProduct(id: string): Promise<Product | null> {
    const produto = await prisma.product.findUnique({ where: { id: id } });
    return produto;
}
export async function updateProduct(id: string, product: ProdCreateDto): Promise<number> {
    try {
        const affectedCount = await prisma.product.updateMany({
            where: { id: id },  // Condição para encontrar o produto pelo id
            data: product,      // Dados para atualizar
        });

        return affectedCount.count;  // Retorna o número de registros afetados
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        throw new Error("Erro ao atualizar produto");
    }
};

export async function removeProduct(id: string): Promise<number>{
    try {
        const affectedCount = await prisma.product.deleteMany({
            where: { id: String(id) },  // Condição para encontrar o produto pelo id
        });

        return affectedCount.count;  // Retorna o número de registros afetados
    } catch (error) {
        console.error("Erro ao remover produto:", error);
        throw new Error("Erro ao remover produto");
    }
}