import { Router } from 'express';
import { criarCompraController } from '../controllers/compraController';

const router = Router();

router.post('/compras', criarCompraController);

export default router;