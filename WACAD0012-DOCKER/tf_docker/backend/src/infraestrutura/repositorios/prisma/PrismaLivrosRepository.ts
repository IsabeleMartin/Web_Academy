import { PrismaClient } from "@prisma/client";

import { ObjectMapper } from "@/common/ObjectMapper";
import { Livro } from "@/dominio/modelos/Livro";
import { LivrosRepository } from "@/dominio/repositorios/LivrosRepository";
import { RegistroNaoEncontradoError } from "@/dominio/excecoes/RegistroNaoEncontradoError";
import { LivroEntity } from "@/infraestrutura/bd/Entidades";

/**
 * 
 * Classe que implementa as operações de manipulação
 * de registros de livros no banco de dados da aplicação,
 * implementando a utilização do framework ORM Prisma.
 * 
 * Esta classe implementa a interface {@link LivrosRepository}.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class PrismaLivrosRepository implements LivrosRepository {

    /**
     * 
     * Instância de conexão com o banco 
     * de dados.
     */
    private conexao: PrismaClient;

    /**
     * 
     * Instância de um mapeador de objetos
     * de entidade para objetos de modelo.
     */
    private mapper: ObjectMapper<LivroEntity, Livro>;

    public constructor(conexao: PrismaClient, mapper: ObjectMapper<LivroEntity, Livro>){
        this.conexao = conexao;
        this.mapper = mapper;
    }

    /**
     * 
     * Implementação do método que busca por um 
     * registro de um livro na base de dados da 
     * aplicação a partir do código ISBN do livro.
     * 
     * @see {@link LivrosRepository.buscarPorIsbn}
     * @throws {RegistroNaoEncontradoError} O livro não foi encontrado.
     */
    public async buscarPorIsbn(isbn: string): Promise<Livro> {
        const livro = await this.conexao.livro.findUnique({
            where: { isbn }
        });

        if(!livro)
            throw new RegistroNaoEncontradoError(`O livro com código ISBN ${isbn} não foi encontrado.`);

        return await this.mapper.mapear(livro);
    }

    /**
     * 
     * Implementação do método que busca todos 
     * os registros da base de dados da aplicação.
     * 
     * @see {@link LivrosRepository.buscarTodos}
     */
    public async buscarTodos(): Promise<Livro[]> {
        const livros = await this.conexao.livro.findMany();

        return await this.mapper.mapearLista(livros);
    }

    /**
     * 
     * Implementação do método que busca por 
     * um registro de um objeto na base de 
     * dados da aplicação a partir de um ID.
     * 
     * @see {@link LivrosRepository.buscarPorId}
     * @throws {RegistroNaoEncontradoError} O livro não foi encontrado.
     */
    public async buscarPorId(id: string): Promise<Livro> {
        const livro = await this.conexao.livro.findUnique({
            where: { id }
        });

        if(!livro)
            throw new RegistroNaoEncontradoError(`O livro de ID ${id} não foi encontrado.`);

        return await this.mapper.mapear(livro);
    }

    /**
     * 
     * Implementação do método que verifica se 
     * um registro com um determinado ID existe 
     * na base de dados da aplicação.
     * 
     * @see {@link LivrosRepository.existe}
     */
    public async existe(id: string): Promise<boolean> {
        const livro = await this.conexao.livro.findUnique({
            where: { id }
        });

        return !!livro;
    }

    /**
     * 
     * Implementação do método que remove um 
     * registro da base de dados da aplicação 
     * a partir de um ID.
     * 
     * @see {@link LivrosRepository.remover}
     */
    public async remover(id: string): Promise<boolean> {
        const livro = await this.conexao.livro.delete({
            where: { id }
        });

        return !!livro;
    }

    /**
     * 
     * Implementação do método que salva um 
     * registro de um objeto na base de dados 
     * da aplicação.
     * 
     * @see {@link LivrosRepository.salvar}
     */
    public async salvar(livro: Livro): Promise<void> {
        await this.conexao.livro.upsert({
            create: {
                id: livro.id,
                nome: livro.nome,
                sinopse: livro.sinopse,
                isbn: livro.isbn,
                urlImagem: livro.urlImagem,
                autores: livro.autores
            },
            update: {
                nome: livro.nome,
                sinopse: livro.sinopse,
                urlImagem: livro.urlImagem,
                autores: livro.autores
            },
            where: {
                id: livro.id
            }
        });
    }
}

export { PrismaLivrosRepository };
