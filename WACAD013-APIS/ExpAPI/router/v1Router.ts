import express from 'express';
import productRouter from '../resources/product/product.router';
import languageRouter from '../resources/language/language.router';
import usuarioRouter from '../resources/user/usuario.router';
import authRouter from '../resources/auth/auth.router';
import carrinho from '../resources/compra/compra.router'
const router = express.Router();


router.use('/product',
    // #swagger.tags = ['Product']
    productRouter);
router.use('/language',
    // #swagger.tags = ['Language']
    languageRouter);
router.use('/usuario',
    // #swagger.tags = ['Usuario']
    usuarioRouter);
router.use('/carrinho',
    // #swagger.tags = ['Carrinho']
    carrinho);
router.use('/',
    // #swagger.tags = ['Auth']
    authRouter);

export default router;