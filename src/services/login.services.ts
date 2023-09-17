import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/user.model';
import { Loginserviceresponse } from '../types/loginServiceResponse';

const secret = process.env.JWT_SECRET || 'SECRET';

const login = async (username: string, password: string): Promise<Loginserviceresponse> => {
  if (!username || !password) {
    return {
      status: 400,
      message: '"username" and "password" are required',
    };
  }

  const userFound = await UserModel.findOne({ where: { username } });

  if (!userFound || !bcrypt.compareSync(password, userFound.dataValues.password)) {
    return {
      status: 401,
      message: 'Username or password invalid',
    };
  }

  const token = jwt.sign({ id: userFound.dataValues.id,
    username: userFound.dataValues.username }, secret);

  return { status: 200, token };
};

export default {
  login,
};
