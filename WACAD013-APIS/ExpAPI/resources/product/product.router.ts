// Arquivo src/resources/product/product.router.ts
import { Router } from 'express';
import productController from './product.controller';
import { schemaCreate, schemaUpdate } from './product.schema';
import validate from '../../middlewares/validate'
import isAdmin from '../../middlewares/isAdmin';

const router = Router();
// Product controller
router.get('/', productController.index);
router.post('/', isAdmin, validate(schemaCreate), productController.create);
router.get('/:id', productController.read);
router.put('/:id', isAdmin, validate(schemaUpdate), productController.update);
router.delete('/:id', isAdmin, productController.remove);
export default router;