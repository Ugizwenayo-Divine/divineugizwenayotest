import express from 'express';
import authRouter from './authRoutes';
import questionRouter from './questionRoutes';
import gradeRouter from './gradeRoutes';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/question', questionRouter);
apiRouter.use('/grade', gradeRouter);

export default apiRouter;
