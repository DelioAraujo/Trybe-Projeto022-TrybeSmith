import express from 'express';
import * as jwt from 'jsonwebtoken';
// import UserModel from './database/models/user.model';
import ProductModel from './database/models/product.model';

const app = express();

app.use(express.json());

// const secret = process.env.JWT_SECRET || 'SECRET';

app.post('/products', async (req, res) => {
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

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username) {
//     return res.status(400).json({ message: 'username and password are required' });
//   }
//   if (!password) {
//     return res.status(400).json({ message: 'username and password are required' });
//   }

//   const userFound = await UserModel.findOne({
//     where: {
//       username,
//     },
//   });

//   if (!userFound) {
//     return res.status(401).json({ message: 'Username or password invalid' });
//   }
//   if (!password) {
//     return res.status(401).json({ message: 'Username or password invalid' });
//   }

//   const token = jwt.sign({
//     id: userFound.dataValues.id,
//     username: userFound.dataValues.username,

//   }, secret);

//   return res.status(200).json({ token });
// });

export default app;
