import { Request, Response, Router } from 'express';
import { matchesController } from './main';

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.list(req, res));
router.post('/', (req: Request, res: Response) => matchesController.create(req, res));
router.patch('/:id/finish', (req: Request, res: Response) => matchesController.finish(req, res));
router.patch('/:id', (req: Request, res: Response) => matchesController.update(req, res));

export default router;
