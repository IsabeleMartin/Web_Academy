// controllers/mainController.ts
import { Request, Response } from 'express';

// Rota para a página hb1
export const hb1 = (req: Request, res: Response) => {
    res.render('hb1', {
        header: 'Header (common)',
        leftMenu: 'Left Menu (common)',
        center: 'Center (Changes Dynamically)',
        rightBar: 'Right Bar (common)',
        footer: 'Footer (common)',

        layout: 'main',
    });
};

// Rota para a página hb2
export const hb2 = (req: Request, res: Response) => {
    res.render('hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        layout: false,
    });
};

// Rota para a página hb3
export const hb3 = (req: Request, res: Response) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 },
    ];
    res.render('hb3', { profes, layout: false });
};

// Rota para a página hb4
export const hb4 = (req: Request, res: Response) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 },
    ];
    res.render('hb4', { profes, layout: false });
};

// Rota para a página hb5
export const hb5 = (req: Request, res: Response) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render('hb5', { technologies, layout: false });
};


export const testSass = (req: Request, res: Response) => {
    res.render('testSassPage', {
        uf: 'Universidade Federal do Amazonas',
    });
};