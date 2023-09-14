import { RequestHandler } from 'express';
import ProductModel from '../database/models/product.model';

const findAll: RequestHandler = async (req, res) => {
  const productsList = await ProductModel.findAll();

  return res.status(200).json(productsList);
};

const create: RequestHandler = async (req, res) => {
  const { name, price, orderId } = req.body;

  const createProduct = await ProductModel.create({
    name,
    price,
    orderId,
  });

  return res.status(201).json(createProduct.dataValues);
};

export default {
  findAll,
  create,
};