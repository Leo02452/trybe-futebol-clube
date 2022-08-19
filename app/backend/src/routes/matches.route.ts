import { Request, Response, Router } from 'express';
import { matchesController } from './main';

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.list(req, res));

export default router;
