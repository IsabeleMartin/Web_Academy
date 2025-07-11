import { ValidadorLivro } from "../validacoes/ValidadorLivro";

/**
 * 
 * Tipagem que define os parâmetros para criação
 * de um objeto de modelo de livro.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
type LivroParams = {
    id: string;
    nome: string;
    sinopse: string;
    isbn: string;
    urlImagem?: string;
    autores: string[];
};

/**
 * 
 * Classe de modelo que define um registro de um
 * livro na base de dados da aplicação.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class Livro {

    private _id: string;
    private _nome: string;
    private _sinopse: string;
    private _isbn: string;
    private _urlImagem?: string;
    private _autores: string[];

    public constructor(params: LivroParams){
        this.validar(params);

        this._id = params.id;
        this._nome = params.nome;
        this._sinopse = params.sinopse;
        this._isbn = params.isbn;
        this._urlImagem = params.urlImagem;
        this._autores = params.autores;
    }

    public get id(): string {
        return this._id;
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(novoNome: string){
        this._nome = novoNome;
    }

    public get sinopse(): string {
        return this._sinopse;
    }

    public set sinopse(novaSinopse: string){
        this._sinopse = novaSinopse;
    }

    public get isbn(): string {
        return this._isbn;
    }

    public set isbn(novoIsbn: string){
        this._isbn = novoIsbn;
    }

    public get urlImagem(): string | undefined {
        return this._urlImagem;
    }

    public set urlImagem(novaUrlImagem: string | undefined){
        this._urlImagem = novaUrlImagem;
    }

    public get autores(): string[] {
        return this._autores;
    }

    public set autores(novosAutores: string[]){
        this._autores = novosAutores;
    }

    private validar(params: LivroParams): void {
        const validador = ValidadorLivro.instanciar();

        validador
            .nome(params.nome)
            .sinopse(params.sinopse)
            .isbn(params.isbn)
            .urlImagem(params.urlImagem)
            .autores(params.autores);
    }
}

export { Livro };
