import { RequestHandler } from 'express';
// import ProductModel from '../database/models/product.model';
import productsServices from '../services/products.services';

const findAll: RequestHandler = async (req, res) => {
  const productsList = await productsServices.findAll();

  return res.status(200).json(productsList);
};

const create: RequestHandler = async (req, res) => {
  const { name, price, orderId } = req.body;

  const createProduct = await productsServices.create(name, price, orderId);

  return res.status(201).json(createProduct);
};

export default {
  findAll,
  create,
};