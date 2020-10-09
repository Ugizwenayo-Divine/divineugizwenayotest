import express from 'express';
import authController from '../../controllers/authControllers';
import authMiddlewares from '../../middlewares/authValidations';
import userAuthentication from '../../middlewares/authMiddlewares';

const { 
  signUp,
  userLogin,
  updateUserType,
  userDeletion,
  allUsers,
  userLogout,
  findEmail
} = authController;
const {
  isUserAdmin,
  isUserLoggedIn,
  doesUserExist,
} = userAuthentication;
const {
  loginValidation,
  signupValidation,
  checkUserExistance,
  roleValidation
} = authMiddlewares;
const authenticationRouter = express.Router();

authenticationRouter.post('/signup', signupValidation, signUp);
authenticationRouter.post('/login', loginValidation, checkUserExistance, userLogin);
authenticationRouter.patch('/update-user',isUserLoggedIn, isUserAdmin, roleValidation, doesUserExist, updateUserType);
authenticationRouter.delete('/delete-user/:id',isUserLoggedIn, isUserAdmin, doesUserExist, userDeletion);
authenticationRouter.get('/',isUserLoggedIn, isUserAdmin, allUsers);
authenticationRouter.get('/logout',isUserLoggedIn, userLogout);
authenticationRouter.get('/:email', isUserLoggedIn,isUserAdmin,findEmail);

export default authenticationRouter;
