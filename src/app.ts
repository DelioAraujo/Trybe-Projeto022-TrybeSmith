import express from 'express';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from './database/models/user.model';
import ProductModel from './database/models/product.model';
import OrderModel from './database/models/order.model';
import nameValidation from './middlewares/nameValidation';
import priceValidation from './middlewares/priceValidation';

const app = express();

app.use(express.json());

const secret = process.env.JWT_SECRET || 'SECRET';

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }

  const userFound = await UserModel.findOne({ where: { username } });

  if (!userFound) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }

  const passwordMatch = bcrypt.compareSync(password, userFound.dataValues.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }

  const token = jwt.sign({ id: userFound.dataValues.id,
    username: userFound.dataValues.username }, secret);

  return res.status(200).json({ token });
});

app.post('/products', nameValidation, priceValidation, async (req, res) => {
  const { name, price, orderId } = req.body;

  const createProduct = await ProductModel.create({
    name,
    price,
    orderId,
  });

  return res.status(201).json(createProduct.dataValues);
});

app.get('/products', async (req, res) => {
  const productsList = await ProductModel.findAll();

  return res.status(200).json(productsList);
});

app.get('/orders', async (req, res) => {
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
});

export default app;
