import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { awayTeamsMatches } from './mocks/awayTeamsMatches';
import { awayLeaderboard } from './mocks/awayLeaderboard';
import Team from '../database/models/team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  describe('Get away leaderboard', () => {
    beforeEach(() => {
      sinon.stub(Team, "findAll").resolves(awayTeamsMatches as unknown as Team[]);
    })
  
    afterEach(() => {
      sinon.restore();
    })

    it('should return a 200 status code', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/away');

      expect(response.status).to.be.eq(200);
    });

    it('should return a away leaderboard', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/away');

      expect(response.body).to.be.deep.equal(awayLeaderboard);
    });
  });
});
