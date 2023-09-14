import express from 'express';
import nameValidation from './middlewares/nameValidation';
import priceValidation from './middlewares/priceValidation';
import productsController from './controllers/products.controller';
import ordersController from './controllers/orders.controller';
import loginController from './controllers/login.controller';

const app = express();

app.use(express.json());

app.post('/login', loginController.login);

app.post('/products', nameValidation, priceValidation, productsController.create);

app.get('/products', productsController.findAll);

app.get('/orders', ordersController.findAll);

export default app;
