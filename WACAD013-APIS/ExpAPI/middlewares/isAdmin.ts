// Arquivo src/middlewares/isAdmin.ts
import { Request, Response, NextFunction } from 'express';
import { checkIsAdmin } from '../resources/auth/auth.service';
const isAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uid = req.session.uid;
    console.log("uid ",uid);
    if (uid && (await checkIsAdmin(uid))) next();
    else res.status(403).json({ msg: 'Não autorizado' });
};
export default isAdmin;