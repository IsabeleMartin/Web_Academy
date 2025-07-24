import { Router } from "express";
import {adicionarProduto, finalizarCompra} from './compra.controller'
import isAuth from "../../middlewares/isAuth";

const router = Router();


router.post("/adicionar",isAuth, adicionarProduto);
router.put("/finalizar", isAuth, finalizarCompra);
export default router;