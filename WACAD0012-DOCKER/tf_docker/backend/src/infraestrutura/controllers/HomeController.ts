import { Request, Response } from "express";

/**
 * 
 * Classe de controle de requisições HTTP da
 * aplicação, respondendo às ações de chamada 
 * para a rota base **\/api**.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class HomeController {

    /**
     * 
     * Método que responde a ação de chamada para a 
     * rota **GET /**.
     * 
     * @param req Objeto de requisição.
     * @param res Objeto de resposta.
     */
    public async home(req: Request, res: Response): Promise<void> {
        res.json({
            nome: "webacademy-livros-backend",
            versao: "1.0.0",
            dataVersao: "2023-05-08",
            responsaveis: [
                {
                    nome: "linnikmaciel",
                    email: "linnik.souza123@gmail.com",
                    github: "https://github.com/linnikmaciel"
                }
            ]
        });
    }
}

export { HomeController };
