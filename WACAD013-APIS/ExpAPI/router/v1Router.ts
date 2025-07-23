import express from 'express';
import productRouter from '../resources/product/product.router';
import languageRouter from '../resources/language/language.router';
import usuarioRouter from '../resources/user/usuario.router';
import authRouter from '../resources/auth/auth.router';

const router = express.Router();

router.use('/product', productRouter);
router.use('/language', languageRouter);
router.use('/usuario', usuarioRouter);
router.use('/', authRouter);

export default router;