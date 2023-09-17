import bcrypt, { compareSync } from 'bcryptjs';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app'
import UserModel from '../../../src/database/models/user.model';
import { username } from '../../../src/database/config/database';

chai.use(chaiHttp);

describe('POST /login', function () {
  beforeEach(function () { sinon.restore(); });

  it('sem username', async function () {
    const reqBody = { username: '', password: 'correto'};

    const loginResponse = await chai.request(app).post('/login').send(reqBody);

    expect(loginResponse.status).to.equal(400);
    expect(loginResponse.body).to.be.deep.equal({message: 'username and password are required'})

  });

  it('sem password', async function () {
    const reqBody = { username: 'correto', password: ''};

    const loginResponse = await chai.request(app).post('/login').send(reqBody);

    expect(loginResponse.status).to.equal(400);
    expect(loginResponse.body).to.be.deep.equal({message: 'username and password are required'})

  });

  it('username que não existe', async function () {
    const reqBody = { username: 'nãoExiste', password: 'correto'};

    sinon.stub(UserModel, 'findOne').resolves(null)

    const loginResponse = await chai.request(app).post('/login').send(reqBody);

    expect(loginResponse.status).to.equal(401);
    expect(loginResponse.body).to.be.deep.equal({message: 'Username or password invalid'})

  });

  it('req body correto', async function () {
    const reqBody = { username: 'correto', password: 'correto'};

    const mockFindOneReturn = UserModel.build({
      id: 1,
      username: 'Hagar',
      vocation: 'Guerreiro',
      level: 10,
      password: "validPassword",
    })

    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

    sinon.stub(bcrypt, 'compareSync').returns(true);

    const loginResponse = await chai.request(app).post('/login').send(reqBody);

    expect(loginResponse.status).to.equal(200);
  });

});
