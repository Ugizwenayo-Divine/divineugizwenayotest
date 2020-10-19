import express from 'express';
import questionController from '../../controllers/questionControllers';
import userAuthentication from '../../middlewares/authMiddlewares';
import questionMiddleware from '../../middlewares/quizMiddlewares';
import questionValidations from '../../middlewares/quizValidations';

const { 
  questionDeletion,
  getAll,
  getOneQuestion,
  questionUpdation,
  saveQuestion,
  getAllQuestions,
  quizCorrection,
  getQuestionByType,
} = questionController;
const {
  isUserAdmin,
  isUserLoggedIn,
} = userAuthentication;
const {
  doesQuestionExist
} = questionMiddleware;
const {
  questionValidation,
  updateValidation,
} = questionValidations;

const questionRouter = express.Router();

questionRouter.post('/add', isUserLoggedIn, isUserAdmin, questionValidation, saveQuestion);
questionRouter.post('/quiz', isUserLoggedIn, quizCorrection);
questionRouter.patch('/:id', isUserLoggedIn, isUserAdmin, doesQuestionExist, updateValidation, questionUpdation);
questionRouter.get('/', isUserLoggedIn, getAll);
questionRouter.get('/quiz', isUserLoggedIn, getAllQuestions);
questionRouter.get('/type', isUserLoggedIn, getQuestionByType);
questionRouter.delete('/:id', isUserLoggedIn, isUserAdmin, doesQuestionExist, questionDeletion);
questionRouter.get('/:id', isUserLoggedIn, doesQuestionExist, getOneQuestion);


export default questionRouter;
