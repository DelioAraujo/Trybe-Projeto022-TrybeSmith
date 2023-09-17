import bcrypt, { compareSync } from 'bcryptjs';
import { expect } from 'chai';
import sinon from 'sinon';
import loginServices from '../../../src/services/login.services'
import UserModel from '../../../src/database/models/user.model';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('sem username', async function () {
    const body = { username: '', password: 'qualquer'};

    const loginData = await loginServices.login(body.username, body.password)

    expect(loginData).to.deep.equal({
      status: 400,
      message: '"username" and "password" are required',
    });

  });

  it('sem password', async function () {
    const body = { username: 'qualquer', password: ''};

    const loginData = await loginServices.login(body.username, body.password)

    expect(loginData).to.deep.equal({
      status: 400,
      message: '"username" and "password" are required',
    });

  });

  it ('username incorreto', async function () {

    sinon.stub(UserModel, 'findOne').resolves(null)

    const loginData = await loginServices.login("errado", "correto");

    expect(loginData).to.deep.equal({
      status: 401,
      message: 'Username or password invalid',
    });
  });

  it ('senha incorreta', async function () {

    sinon.stub(bcrypt, 'compareSync').returns(false);

    sinon.stub(UserModel, 'findOne').resolves(UserModel.build({
      id: 1,
      username: 'Hagar',
      vocation: 'Guerreiro',
      level: 10,
      password: "validPassword",
    }));

    const loginData = await loginServices.login("correto", "correto");

    expect(loginData).to.deep.equal({
      status: 401,
      message: 'Username or password invalid',
    });

});

it ('tudo correto', async function () {

  sinon.stub(bcrypt, 'compareSync').returns(true);

  sinon.stub(UserModel, 'findOne').resolves(UserModel.build({
    id: 1,
    username: 'Hagar',
    vocation: 'Guerreiro',
    level: 10,
    password: "validPassword",
  }));

  const loginData = await loginServices.login("correto", "correto");

  expect(loginData.status).to.be.equal(200);
  });

});
