import { RequestHandler } from 'express';
// import ProductModel from '../database/models/product.model';
// import OrderModel from '../database/models/order.model';
import ordersServices from '../services/orders.services';

const findAll: RequestHandler = async (req, res) => {
  const finalList = await ordersServices.findAll();

  return res.status(200).json(finalList);
};

export default {
  findAll,
};