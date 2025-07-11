import { ValidacaoError } from "../excecoes/ValidacaoError";

class ValidadorLivro {

    private constructor(){}

    public nome(valor?: string): ValidadorLivro {
        if(!valor)
            throw new ValidacaoError("O nome do livro não pode estar em branco.", { valor });

        if(valor.length < 20 || valor.length > 180)
            throw new ValidacaoError("O nome do livro deve ter entre 20 e 180 caracteres.", { valor });

        return this;
    }

    public sinopse(valor?: string): ValidadorLivro {
        if(!valor || valor.length === 0)
            throw new ValidacaoError("A sinopse o livro não pode estar em branco.", { valor });

        return this;
    }

    public isbn(valor?: string): ValidadorLivro {
        if(!valor || valor.length === 0)
            throw new ValidacaoError("O código ISBN do livro não pode estar em branco.", { valor });

        if(valor.length !== 13)
            throw new ValidacaoError("O código ISBN deve ser formado por 13 caracteres.", { valor });

        return this;
    }

    public urlImagem(valor?: string): ValidadorLivro {
        const regex = /^((https?:)(\/\/\/?)([\w]*(?::[\w]*)?@)?([\d\w\.-]+)(?::(\d+))?)?([\/\\\w\.()-]*)?(?:([?][^#]*)?(#.*)?)*/gmi;

        if(valor && !regex.test(valor))
            throw new ValidacaoError("A URL da imagem deve ser uma URL válida.", { valor });

        return this;
    }

    public autores(valor?: string[]): ValidadorLivro {
        if(!valor || valor.length === 0)
            throw new ValidacaoError("O livro deve ter pelo menos um autor.", { valor });

        for(let val of valor)
            if(val.length === 0 || val.trim().length === 0)
                throw new ValidacaoError("Existe um nome de autor do livro em branco.", { valorEncontrado: val });
    
        return this;
    }

    public static instanciar(): ValidadorLivro {
        return new ValidadorLivro();
    }
}

export { ValidadorLivro };
