import LeaderboardController from '../controllers/leaderboard.controller';
import AuthController from '../controllers/auth.controller';
import MatchesController from '../controllers/matches.controller';
import TeamsController from '../controllers/teams.controller';
import AuthService from '../services/auth.service';
import JwtService from '../services/jwt.service';
import MatchesService from '../services/matches.service';
import TeamsService from '../services/teams.service';
import LeaderboardService from '../services/leaderboard.service';
import LoginService from '../services/Login/LoginService';
import UserRepository from '../repositories/UsersRepository';
import User from '../database/models/user';
import { bcryptPasswordProvider, jwtTokenProvider } from '../providers';

const usersRepository = new UserRepository(User);

const jwtService = new JwtService();
const authService = new AuthService(jwtService);
const loginService = new LoginService(usersRepository, bcryptPasswordProvider, jwtTokenProvider);
const authController = new AuthController(authService, loginService);

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService, authService, teamsService);

const lbService = new LeaderboardService();
const lbController = new LeaderboardController(lbService);

export { authController, jwtService, teamsController, matchesController, lbController };
