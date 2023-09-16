import { expect } from 'chai';
import sinon from 'sinon';
import loginServices from '../../../src/services/login.services'
import UserModel from '../../../src/database/models/user.model';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('retorna 400 e msg correta se não tiver username ou password', async function () {
    const body = { username: '', password: 'qualquer'};

    const loginData = await loginServices.login(body.username, body.password)

    expect(loginData).to.deep.equal({
      status: 400,
      message: 'username and password are required',
    });

  });

  it ('retorno usuário não encontrado', async function () {
    const body = {
      username: "errado",
      password: "terrível"
    }

    sinon.stub(UserModel, 'findOne').resolves(null)

    const loginData = await loginServices.login(body.username, body.password);

    expect(loginData).to.deep.equal({
      status: 401,
      message: 'Username or password invalid',
    });

  });

});
