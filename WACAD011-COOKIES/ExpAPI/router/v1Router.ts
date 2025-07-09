import express from 'express';
import productRouter from '../resources/product/product.router';
const router = express.Router();
router.use('/product', productRouter);
export default router;