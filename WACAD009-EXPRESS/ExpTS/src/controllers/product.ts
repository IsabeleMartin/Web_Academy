// Arquivo src/controllers/product.ts

import { Request, Response } from 'express';
import { get, post, put, del } from '../utils/api';
import { Product } from '../types/products';

const index = async (req: Request, res: Response) => {
  const products = await get('products');
  res.render('products/index', {
    products,
  });
};

const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    console.log('get');
    try {
      res.render('products/create');
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === 'POST') {
    console.log('post');
    try {
      const newProduct: Product = req.body;
      await post('products', newProduct);
      res.redirect('/products');
    } catch (err) {
      console.log(err);
    }
  }
};
const read = async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await get(`products/${id}`);
  res.render('products/read', {
    product,
  });
};
const update = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (req.method === 'GET') {
    try {
      const product = await get(`products/${id}`);
      console.log(product);

      // Renderiza a view de edição com os dados do produto
      res.render('products/edite', { product });
    } catch (error) {
      console.error('Erro ao buscar produto para edição:', error);
      res.status(500).render('error', { message: 'Erro ao carregar produto' });
    }
  } else if (req.method === 'POST') {
    try {
      const updatedProduct = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
      };

      await put(`products/${id}`, updatedProduct);
      res.redirect('/products');
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).render('error', { message: 'Erro ao salvar produto' });
    }
  }
};

const remove = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await del(`products/${id}`);
    res.redirect('/products'); // redireciona para a listagem após deletar
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).render('error', { message: 'Erro ao deletar o produto' });
  }
};


export default { index, create, read, update, remove };
