import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { matches } from './mocks/matches';
import Match from '../database/models/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  describe('List', () => {
    beforeEach(() => {
      sinon.stub(Match, "findAll").resolves(matches as unknown as Match[]);
    })
  
    afterEach(() => {
      sinon.restore();
    })

    it('should return a 200 status code', async () => {
      const response = await chai.request(app)
        .get('/matches');

      expect(response.status).to.be.eq(200);
    });

    it('should return a matches list', async () => {
      const response = await chai.request(app)
        .get('/matches');

      expect(response.body).to.be.deep.equal(matches);
    });
  });

  describe('Finish', () => {
    beforeEach(() => {
      sinon.stub(Match, "findOne").resolves(matches[0] as unknown as Match);
    })
  
    afterEach(() => {
      sinon.restore();
    })

    it('should return a 200 status code', async () => {
      const response = await chai.request(app)
        .patch('/matches/1/finish');

      expect(response.status).to.be.eq(200);
    });

    it('should return a matches list', async () => {
      const response = await chai.request(app)
        .patch('/matches/1/finish');

      expect(response.body).to.be.deep.equal({ message: 'finished' });
    });
  });
});
