import { ObjectMapper } from "@/common/ObjectMapper";
import { Livro } from "@/dominio/modelos/Livro";
import { LivroEntity } from "./Entidades";

/**
 * 
 * Implementação da interface de mapeamento de objetos
 * de origem {@link LivroEntity} para objetos de destino 
 * {@link Livro}.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class LivroEntityMapper extends ObjectMapper<LivroEntity, Livro> {

    public constructor(){
        super();
    }

    /**
     * 
     * Implementação do método que mapeia um objeto 
     * de origem {@link LivroEntity} para um objeto 
     * de destino {@link Livro}.
     */
    public async mapear(entity: LivroEntity): Promise<Livro> {
        return new Livro({
            id: entity.id,
            nome: entity.nome,
            sinopse: entity.sinopse,
            isbn: entity.isbn,
            urlImagem: entity.urlImagem!,
            autores: entity.autores as string[]
        });
    }
}

export { LivroEntityMapper };
