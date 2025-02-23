import { Router } from 'express';
import blogRouter from './blogRouter';
import authRouter from './authRouter';

const router = Router();

router.use('/blogs', blogRouter);
router.use('/auth', authRouter);

export default router;
