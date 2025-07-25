import { Request, Response } from "express";

function changeLanguage (req: Request, res: Response){
     /*
    #swagger.summary = 'Altera a linguagem preferida do usuário.'
    #swagger.description = 'Esse endpoint define a linguagem preferida do usuário, armazenando-a em um cookie.'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Linguagem preferida do usuário',
        required: true,
        schema: {
            type: 'object',
            properties: {
                lang: { type: 'string', example: 'en' }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Linguagem alterada com sucesso.',
        schema: {
            type: 'object',
            properties: {
                lang: { type: 'string', example: 'en' }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Erro ao definir a linguagem.',
    }
    */
    const { lang } = req.body;
    res.cookie('lang', lang);
    res.json({ lang });
}

export default {changeLanguage};