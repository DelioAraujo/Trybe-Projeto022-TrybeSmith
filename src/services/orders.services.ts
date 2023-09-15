import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { Orderslist } from '../types/Order';

const findAll = async (): Promise<Orderslist[]> => {
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

  return finalList;
};

export default {
  findAll,
};
