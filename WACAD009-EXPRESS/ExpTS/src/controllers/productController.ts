import { Request, Response } from 'express';
import axios from 'axios';


const API_URL = 'http://localhost:3355/products';

const createProductPage = (req: Request, res: Response) => {
  res.render('createProduct', {
    title: 'Criar Produto',
    layout: 'main',
  });
};


const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;

    const { data: products } = await axios.get('http://localhost:3355/products');
    const maxId = Math.max(...products.map((p: any) => parseInt(p.id)));
    newProduct.id = String(maxId + 1);

    await axios.post('http://localhost:3355/products', newProduct);

    res.redirect('/products');
  } catch (error) {
    res.status(500).render('error', { message: 'Erro ao criar produto' });
  }
};


const getProducts = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(API_URL);
    res.render('products', { products: response.data, title: 'Lista de Produtos' });
  } catch (error) {
    res.status(500).render('error', { message: 'Erro ao obter produtos' });
  }
};


const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${API_URL}/${id}`);
    res.render('productEdit', { product: response.data, title: 'Editar Produto' });
  } catch (error) {
    res.status(500).render('error', { message: 'Erro ao obter produto' });
  }
};


const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;

    await axios.put(`${API_URL}/${id}`, updatedProduct);

    res.redirect('/products');
  } catch (error) {
    res.status(500).render('error', { message: 'Erro ao atualizar produto' });
  }
};


const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await axios.delete(`${API_URL}/${id}`);

    res.redirect('/products');
  } catch (error) {
    res.status(500).render('error', { message: 'Erro ao excluir produto' });
  }
};

export default { createProduct, createProductPage, getProducts, getProductById, updateProduct, deleteProduct };