import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';

const findAll = async (): Promise<Product[]> => {
  const productsList = await ProductModel.findAll();

  return productsList.map((product) => product.dataValues);
};

const create = async (name: string, price: string, orderId: number): Promise<Product> => {
  const createProduct = await ProductModel.create({
    name,
    price,
    orderId,
  });

  return createProduct.dataValues;
};

export default {
  findAll,
  create,
};
