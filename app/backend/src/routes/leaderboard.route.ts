import { Request, Response, Router } from 'express';
import { lbController } from './main';

const router = Router();

router.get('/home', (req: Request, res: Response) => lbController.getFilteredLeaderboard(req, res));
router.get('/away', (req: Request, res: Response) => lbController.getFilteredLeaderboard(req, res));
router.get('/', (req: Request, res: Response) => lbController.getFullLeaderboard(req, res));

export default router;
