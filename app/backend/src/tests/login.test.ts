import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/user';
import { jwtService } from '../routes/main';
import { userMock,
  correctBodyLogin,
  userWithoutPassword,
  userRole,
  loginBodyWithoutEmail,
  loginBodyWithoutPwd,
  loginBodyWithEmptyPwd,
  loginBodyWithEmptyEmail,
  loginBodyWithNotValidPwd,
  loginBodyWithNotValidEmail,
  loginBodyWithWrongEmail,
  loginBodyWithWrongPwd,
} from './mocks/users';

chai.use(chaiHttp);

const { expect } = chai;


describe('Authorization', () => {
  afterEach(() => sinon.restore());

  describe('Login', () => {
    it('should return a 200 status code and a token', async () => {
      sinon.stub(User, "findOne").resolves(userMock as User);
      sinon.stub(jwtService, "generateToken").resolves('any-token');

      const response = await chai.request(app)
        .post('/login')
        .send(correctBodyLogin);

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.equal({ token: 'any-token' })
    });

    it('should return an error if email is not set', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginBodyWithoutEmail);

      expect(response.status).to.be.eq(400);
      expect(response.body).to.be.deep.equal({ message: '"email" is required' })
    });

    it('should return an error if password is not set', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginBodyWithoutPwd);

      expect(response.status).to.be.eq(400);
      expect(response.body).to.be.deep.equal({ message: '"password" is required' })
    });

    it('should return an error if email field is empty', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginBodyWithEmptyEmail);

      expect(response.status).to.be.eq(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' })
    });

    it('should return an error if password field is empty', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginBodyWithEmptyPwd);

      expect(response.status).to.be.eq(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' })
    });

    it('should return an error if an invalid email is set', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginBodyWithNotValidEmail);

      expect(response.status).to.be.eq(400);
      expect(response.body).to.be.deep.equal({ message: '"email" must be a valid email' })
    });

    it('should return an error if an less than 6 characters password is set', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginBodyWithNotValidPwd);

      expect(response.status).to.be.eq(400);
      expect(response.body).to.be.deep.equal({ message: '"password" length must be at least 6 characters long' })
    });

    it('should return an error if email is not registered', async () => {
      sinon.stub(User, "findOne").resolves(null);

      const response = await chai.request(app)
        .post('/login')
        .send(loginBodyWithWrongEmail);

      expect(response.status).to.be.eq(401);
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' })
    });

    it('should return an error if a wrong password is set', async () => {
      sinon.stub(User, "findOne").resolves(userMock as User);

      const response = await chai.request(app)
        .post('/login')
        .send(loginBodyWithWrongPwd);

      expect(response.status).to.be.eq(401);
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' })
    });
  });

  describe('Validate login', () => {
    it('should return a 200 status code and the user role', async () => {
      sinon.stub(User, "findOne").resolves(userMock as User);
      sinon.stub(jwtService, "verifyToken").resolves(userWithoutPassword);

      const response = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', 'any-token');

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.equal(userRole);
    });

    it('should return an error if token is not set', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', '');

      expect(response.status).to.be.eq(400);
      expect(response.body).to.be.deep.equal({ message: 'Token not found!'});
    });

    it('should return an error if an invalid token is set', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', 'invalid-token');

      expect(response.status).to.be.eq(401);
      expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token'});
    });

    it('should return an error if user is not registered', async () => {
      sinon.stub(jwtService, "verifyToken").resolves(userWithoutPassword);
      sinon.stub(User, "findOne").resolves(null);

      const response = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', 'any-token');

      expect(response.status).to.be.eq(404);
      expect(response.body).to.be.deep.equal({ message: 'User not found'});
    });
  });
});
