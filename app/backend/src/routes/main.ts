import AuthService from '../services/auth.service';
import AuthController from '../controllers/auth.controller';
import JwtService from '../services/jwt.service';

const jwtService = new JwtService();
const authService = new AuthService(jwtService);
const authController = new AuthController(authService);

export default authController;
