import express from 'express';
import productRouter from '../resources/product/product.router';
import languageRouter from '../resources/language/language.router';
import usuarioRouter from '../resources/user/usuario.router';
import authRouter from '../resources/auth/auth.router';
import carrinho from '../resources/compra/compra.router'
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Rotas relacionadas aos produtos
 */
router.use('/product', productRouter);
/**
 * @swagger
 * tags:
 *   - name: Language
 *     description: Rotas relacionadas aos idiomas
 */
router.use('/language', languageRouter);
/**
 * @swagger
 * tags:
 *   - name: Usuario
 *     description: Rotas relacionadas aos usuários
 */
router.use('/usuario', usuarioRouter);

/**
 * @swagger
 * tags:
 *   - name: Carrinho
 *     description: Rotas relacionadas ao carrinho de compras
 */
router.use('/carrinho', carrinho);

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Rotas relacionadas à autenticação
 */
router.use('/', authRouter);

export default router;