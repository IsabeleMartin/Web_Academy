import { Livro } from "@prisma/client";

/**
 * 
 * Tipagem que define o objeto de entidade 
 * de livro no banco de dados gerenciado 
 * pelo Prisma.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
type LivroEntity = Livro;

export { LivroEntity };
