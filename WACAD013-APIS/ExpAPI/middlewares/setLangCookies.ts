import { Response, Request, NextFunction } from "express";
const setLangCookies = (req: Request, res: Response, next: NextFunction) => {
    if (!('lang' in req.cookies)) res.cookie('lang', 'en');
    next();
};

export default setLangCookies;