import express from 'express';
import GradeController from '../../controllers/gradeControllers';
import userAuthentication from '../../middlewares/authMiddlewares';
import quizMiddlewares from '../../middlewares/quizMiddlewares';

const {
  getAllUserGrades,
  getOneGrade,
  gradeDeletion,
  getAll,
} = GradeController;
const {
  isUserAdmin,
  isUserLoggedIn,
} = userAuthentication;
const {
  doesGradeExist,
} = quizMiddlewares;

const gradeRouter = express.Router();

gradeRouter.get('/', isUserLoggedIn, isUserAdmin, getAll);
gradeRouter.get('/user', isUserLoggedIn, getAllUserGrades);
gradeRouter.delete('/:id', isUserLoggedIn, isUserAdmin, doesGradeExist, gradeDeletion);
gradeRouter.get('/:id', isUserLoggedIn, doesGradeExist, getOneGrade);


export default gradeRouter;
