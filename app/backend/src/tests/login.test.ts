import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/user';
import { jwtService } from '../routes/main';

chai.use(chaiHttp);

const { expect } = chai;

const adminMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

describe('Authorization', () => {
  describe('Login', () => {
    beforeEach(() => {
      sinon.stub(User, "findOne").resolves(adminMock as User);
      sinon.stub(jwtService, "generateToken").resolves(adminMock.password);
    })

    afterEach(() => {
      sinon.restore();
    })

    it('should return a 200 status code', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
            email: "admin@admin.com",
            password: "secret_admin"
        });

      expect(response.status).to.be.eq(200);
    });
    it('should return a token', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
            email: "admin@admin.com",
            password: "secret_admin"
        });

      expect(response.body).to.have.property('token');
    });
  });
});
