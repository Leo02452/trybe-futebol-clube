import { Request, Response, Router } from 'express';
import authController from './main';

const router = Router();

router.post('/', (req: Request, res: Response) => authController.login(req, res));

export default router;
