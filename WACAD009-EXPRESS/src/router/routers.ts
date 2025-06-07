import { Router } from 'express';
//import productController from '../controllers/product';
const router = Router();
// Controlador Product
router.get('/product', productController.index);
router.all('/product/create', productController.create);
router.all('/product/update/:id', productController.update);
router.get('/product/:id', productController.read);
router.post('/product/:id', productController.remove);
export default router;