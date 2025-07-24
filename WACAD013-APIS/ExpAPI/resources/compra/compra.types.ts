import { ItemCompra } from "@prisma/client";
type CompraListDto = Pick<ItemCompra,'id'|'produtoId'|'quantidade'>;
export { CompraListDto}
