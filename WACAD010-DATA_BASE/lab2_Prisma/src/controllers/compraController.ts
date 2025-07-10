import { Request, Response } from 'express';
import { criarCompra } from '../services/compraService';

export const criarCompraController = async (req: Request, res: Response) => {
  try {
    const compra = await criarCompra(req.body);
    res.status(201).json(compra);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};