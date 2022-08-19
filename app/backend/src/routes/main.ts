import AuthController from '../controllers/auth.controller';
import MatchesController from '../controllers/matches.controller';
import TeamsController from '../controllers/teams.controller';
import AuthService from '../services/auth.service';
import JwtService from '../services/jwt.service';
import MatchesService from '../services/matches.service';
import TeamsService from '../services/teams.service';

const jwtService = new JwtService();
const authService = new AuthService(jwtService);
const authController = new AuthController(authService);

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

export default authController;
export { teamsController, matchesController };
