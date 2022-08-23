import { Request, Response, Router } from 'express';
import { lbController } from './main';

const router = Router();

router.get('/home', (req: Request, res: Response) => lbController.getHome(req, res));
router.get('/away', (req: Request, res: Response) => lbController.getAway(req, res));
router.get('/', (req: Request, res: Response) => lbController.getAll(req, res));

export default router;
