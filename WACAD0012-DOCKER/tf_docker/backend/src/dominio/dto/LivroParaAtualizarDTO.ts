/**
 * 
 * Definição de tipo DTO que encapsula os dados
 * de um livro para atualizar.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
type LivroParaAtualizarDTO = {
    nome: string;
    sinopse: string;
    autores: string[];
    urlImagem?: string;
};

export { LivroParaAtualizarDTO };
