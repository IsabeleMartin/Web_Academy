import { ObjectMapper } from "@/common/ObjectMapper";
import { LivroDTO } from "../dto/LivroDTO";
import { Livro } from "../modelos/Livro";

/**
 * 
 * Implementação da interface de mapeamento de objetos
 * de origem {@link Livro} para objetos de 
 * destino {@link LivroDTO}.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class LivroDTOMapper extends ObjectMapper<Livro, LivroDTO> {

    public constructor(){
        super();
    }

    /**
     * 
     * Implementação do método que mapeia um objeto de
     * origem {@link Livro} para um objeto 
     * de destino {@link LivroDTO}.
     */
    public async mapear(modelo: Livro): Promise<LivroDTO> {
        return {
            nome: modelo.nome,
            sinopse: modelo.sinopse,
            isbn: modelo.isbn,
            urlImagem: modelo.urlImagem,
            autores: modelo.autores
        };
    }
}

export { LivroDTOMapper };
