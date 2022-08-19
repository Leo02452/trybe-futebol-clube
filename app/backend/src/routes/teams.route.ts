import { Request, Response, Router } from 'express';
import { teamsController } from './main';

const router = Router();

router.get('/:id', (req: Request, res: Response) => teamsController.getById(req, res));
router.get('/', (req: Request, res: Response) => teamsController.list(req, res));

export default router;
