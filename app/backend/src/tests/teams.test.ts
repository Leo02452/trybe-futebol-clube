import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Team from '../database/models/team';
import { teams } from './mocks/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  describe('List', () => {
    beforeEach(() => {
      sinon.stub(Team, "findAll").resolves(teams as Team[]);
    })
  
    afterEach(() => {
      sinon.restore();
    })

    it('should return a 200 status code', async () => {
      const response = await chai.request(app)
        .get('/teams');

      expect(response.status).to.be.eq(200);
    });

    it('should return a team list', async () => {
      const response = await chai.request(app)
        .get('/teams');

      expect(response.body).to.be.deep.equal(teams);
    });
  });
});
