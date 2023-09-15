import { RequestHandler } from 'express';
// import bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';
// import UserModel from '../database/models/user.model';
import loginServices from '../services/login.services';

const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const loginData = await loginServices.login(username, password);

  if (loginData.status !== 200) {
    return res.status(loginData.status).json({ message: loginData.message });
  }

  return res.status(loginData.status).json({ token: loginData.token });
};

export default {
  login,
};
