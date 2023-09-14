import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/user.model';

const secret = process.env.JWT_SECRET || 'SECRET';

const login: RequestHandler = async (req, res) => {
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
};

export default {
  login,
};
