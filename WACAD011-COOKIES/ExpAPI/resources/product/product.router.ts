// Arquivo src/resources/product/product.router.ts
import { Router } from 'express';
import productController from './product.controller';
const router = Router();
// Product controller
router.get('/', productController.index);
router.post('/create', productController.create);
router.get('/read/:id', productController.read);
router.put('/update/:id', productController.update);
router.delete('/delete/:id', productController.remove);
export default router;