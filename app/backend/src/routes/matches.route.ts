import { Request, Response, Router } from 'express';
import { matchesController } from './main';

const router = Router();

router.get('/?inProgress', (req: Request, res: Response) => matchesController
  .filterByProgress(req, res));
router.get('/', (req: Request, res: Response) => matchesController.list(req, res));
router.post('/', (req: Request, res: Response) => matchesController.create(req, res));

export default router;
