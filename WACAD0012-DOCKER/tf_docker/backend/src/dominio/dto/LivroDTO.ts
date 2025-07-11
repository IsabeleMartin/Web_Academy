/**
 * 
 * Definição de tipo DTO que encapsula os dados
 * de um livro.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
type LivroDTO = {
    nome: string;
    sinopse: string;
    isbn: string;
    urlImagem?: string;
    autores: string[];
};

export {
    LivroDTO
};
