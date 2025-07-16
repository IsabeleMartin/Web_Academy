// Arquivo src/resources/product/product.types.ts
import { Product } from '@prisma/client';
type ProdCreateDto = Pick<Product,'id'|'name'|'price'|'stockQuantity'>;
type ProdUpdateDto = Pick<Product,'name'|'price'|'stockQuantity'>;
export { ProdCreateDto, ProdUpdateDto}

