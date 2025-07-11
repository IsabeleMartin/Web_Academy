import { randomUUID } from "node:crypto";

import { LivroDTO } from "../dto/LivroDTO";
import { LivroParaAtualizarDTO } from "../dto/LivroParaAtualizarDTO";
import { LivroParaCriarDTO } from "../dto/LivroParaCriarDTO";
import { Livro } from "../modelos/Livro";
import { LivroDTOMapper } from "../objectmapper/LivroDTOMapper";
import { LivrosRepository } from "../repositorios/LivrosRepository";
import { ObjectMapper } from "@/common/ObjectMapper";

/**
 * 
 * Classe de serviço que executa as regras de
 * negócio de livros na aplicação.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class LivrosService {

    /**
     * 
     * Instância de um repositório de livros.
     */
    private repository: LivrosRepository;

    /**
     * 
     * Instância de um mapeador de objetos de
     * livros.
     */
    private livroMapper: ObjectMapper<Livro, LivroDTO>;

    /**
     * 
     * Instância de um mapeador de objetos de
     * livros para criar.
     */
    private novoLivroMapper: ObjectMapper<LivroParaCriarDTO, Livro>;

    /**
     * 
     * Recebemos as dependências da classe 
     * pelo construtor, implementando o padrão 
     * de projetos Injeção de Dependências.
     * 
     * @param repository Instância de um repositório de livros.
     * @param livroMapper Instância de um mapeador de objetos 
     * de livro.
     * @param novoLivroMapper Instância de um mapeador de objetos
     * de livro para criar.
     * 
     */
    public constructor(
        repository: LivrosRepository,
        livroMapper: ObjectMapper<Livro, LivroDTO>,
        novoLivroMapper: ObjectMapper<LivroParaCriarDTO, Livro>
    ){
        this.repository = repository;
        this.livroMapper = livroMapper;
        this.novoLivroMapper = novoLivroMapper;
    }

    /**
     * 
     * Método que busca todos os livros 
     * cadastrados na aplicação.
     * 
     * @returns Lista de livros.
     */
    public async buscarTodos(): Promise<LivroDTO[]> {
        const livros = await this.repository.buscarTodos();

        return await this.livroMapper.mapearLista(livros);
    }

    /**
     * 
     * Método que busca os dados de um livro
     * a partir de um código ISBN.
     * 
     * @param isbn Código ISBN do livro pesquisado.
     * @returns Dados do livro.
     */
    public async buscarLivroPorIsbn(isbn: string): Promise<LivroDTO> {
        const livro = await this.repository.buscarPorIsbn(isbn);

        return await this.livroMapper.mapear(livro);
    }

    /**
     * 
     * Método que cadastra um novo livro.
     * 
     * @param novoLivro Dados do novo livro.
     * @returns Registro do novo livro criado.
     */
    public async cadastrarNovoLivro(novoLivro: LivroParaCriarDTO): Promise<LivroDTO> {
        const livro = await this.novoLivroMapper.mapear(novoLivro);
        await this.repository.salvar(livro);

        return await this.livroMapper.mapear(livro);
    }

    /**
     * 
     * Método que atualiza os dados de um livro.
     * 
     * @param isbn Código ISBN do livro a ser atualizado.
     * @param dadosParaAtualizar Dados do livro para atualizar.
     * @returns Registro do livro atualizado.
     */
    public async atualizarLivro(isbn: string, dadosParaAtualizar: LivroParaAtualizarDTO): Promise<LivroDTO> {
        const livro = await this.repository.buscarPorIsbn(isbn);

        livro.nome = dadosParaAtualizar.nome;
        livro.sinopse = dadosParaAtualizar.sinopse;
        livro.autores = dadosParaAtualizar.autores;
        livro.urlImagem = dadosParaAtualizar.urlImagem;

        await this.repository.salvar(livro);

        return await this.livroMapper.mapear(livro);
    }

    /**
     * 
     * Método que apaga um livro a partir do 
     * código ISBN.
     * 
     * @param isbn Código ISBN do livro a ser apagado.
     * @returns Sucesso ou falha na operação.
     */
    public async deletarLivro(isbn: string): Promise<boolean> {
        const livro = await this.repository.buscarPorIsbn(isbn);
        const resultado = await this.repository.remover(livro.id as string);

        return resultado === 1;
    }
}

export { LivrosService };
