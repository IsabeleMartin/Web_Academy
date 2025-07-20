// Arquivo src/resources/product/product.router.ts
import { Router } from 'express';
import productController from './product.controller';
import { schemaCreate, schemaUpdate } from './product.schema';
import validate from '../../middlewares/validate'

const router = Router();
// Product controller
router.get('/', productController.index);
router.post('/', validate(schemaCreate), productController.create);
router.get('/:id', productController.read);
router.put('/:id', validate(schemaUpdate), productController.update);
router.delete('/:id', productController.remove);
export default router;