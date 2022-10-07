import { Request, Response, Router } from 'express';
import loginValidator from '../middlewares/index';
import { authController } from './main';

const router = Router();

router.get('/validate', (req: Request, res: Response) => authController.validate(req, res));
router.post(
  '/',
  loginValidator.validateBody.bind(loginValidator),
  authController.login.bind(authController),
);

export default router;
