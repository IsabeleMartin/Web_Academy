import { randomUUID } from "node:crypto";

import { ObjectMapper } from "@/common/ObjectMapper";
import { LivroParaCriarDTO } from "../dto/LivroParaCriarDTO";
import { Livro } from "../modelos/Livro";

/**
 * 
 * Implementação da interface de mapeamento de objetos
 * de origem {@link LivroParaCriarDTO} para objetos de 
 * destino {@link Livro}.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class LivroParaCriarMapper extends ObjectMapper<LivroParaCriarDTO, Livro> {

    public constructor(){
        super();
    }

    /**
     * 
     * Implementação do método que mapeia um objeto 
     * de origem {@link LivroParaCriarDTO} para um 
     * objeto de destino {@link Livro}.
     */
    public async mapear(dto: LivroParaCriarDTO): Promise<Livro> {
        return new Livro({
            id: randomUUID(),
            nome: dto.nome,
            sinopse: dto.sinopse,
            isbn: dto.isbn,
            urlImagem: dto.urlImagem,
            autores: dto.autores
        });
    }
}

export { LivroParaCriarMapper };
