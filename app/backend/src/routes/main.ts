import AuthService from '../services/auth.service';
import AuthController from '../controllers/auth.controller';
import JwtService from '../services/jwt.service';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services/teams.service';

const jwtService = new JwtService();
const authService = new AuthService(jwtService);
const authController = new AuthController(authService);

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

export default authController;
export { teamsController };
