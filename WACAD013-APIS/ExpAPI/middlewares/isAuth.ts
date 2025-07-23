// Arquivo src/middlewares/isAdmin.ts
import { Request, Response, NextFunction } from 'express';
import { checkIsAuth } from '../resources/auth/auth.service';
import { User } from '@prisma/client';
const isAuth = async (
    req: Request,
    res: Response,
    user: User,
    next: NextFunction
) => {
    const uid = req.session.uid;
    if (uid && (await checkIsAuth(uid, user))) next();
    else res.status(403).json({ msg: 'Não logado' });
};
export default isAuth;