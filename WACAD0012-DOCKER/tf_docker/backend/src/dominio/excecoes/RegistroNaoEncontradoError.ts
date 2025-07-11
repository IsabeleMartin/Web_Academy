import { ErroBase } from "./ErroBase";

/**
 * 
 * Classe de exceção que define a falha de
 * um registro não encontrado na base de 
 * dados da aplicação.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class RegistroNaoEncontradoError extends ErroBase {
    
    public constructor(mensagem: string = "Registro não encontrado."){
        super("NAO_ENCONTRADO", mensagem, null);
    }
}

export { RegistroNaoEncontradoError };
