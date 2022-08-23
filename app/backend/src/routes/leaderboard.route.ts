import { Request, Response, Router } from 'express';
import { lbController } from './main';

const router = Router();

router.get('/home', (req: Request, res: Response) => lbController.getHome(req, res));

export default router;
