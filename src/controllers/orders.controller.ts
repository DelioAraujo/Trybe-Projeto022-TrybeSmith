import { RequestHandler } from 'express';
import ProductModel from '../database/models/product.model';
import OrderModel from '../database/models/order.model';

const findAll: RequestHandler = async (req, res) => {
  const ordersList = await OrderModel.findAll({
    include: {
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    },

  });

  const finalList = ordersList.map(({ dataValues }) => ({
    id: dataValues.id,
    userId: dataValues.userId,
    productIds: dataValues.productIds?.map((product) => product.id),
  }));

  return res.status(200).json(finalList);
};

export default {
  findAll,
};