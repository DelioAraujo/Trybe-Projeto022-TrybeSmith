import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app'

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

});
