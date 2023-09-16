import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginServices from '../../../src/services/login.services'
import loginControllers from '../../../src/controllers/login.controller'

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  // it('retorna erro se corpo sem username', async function () {

  //   sinon.stub(loginServices, 'login').resolves({
  //     status: 400,
  //     message: 'username and password are required',
  //   });



  //   expect(res.status).to.have.been.calledWith(400);
  //   expect(res.json).to.have.been.calledWith({ message: messageUsernameOrPasswordEmpty });
  // })

});
