import bcrypt from 'bcrypt';
import _ from 'lodash';
import { validateSignup, displayErrorMessages, validateLogin, validateRole } from '../helpers/validations';
import userService from '../services/authServices';
import responseHandler from '../helpers/responseHandlers';
import statusCodes from '../helpers/statusCodes';
import responseMessage from '../helpers/customMessages';

const {
  userExists,
} = userService;
const {
  errorResponse,
} = responseHandler;
const {
  forbidden,
} = statusCodes;
const {
  wrongcredentials,
} = responseMessage;

const signupValidation = async (req, res, next) => {
  const { error } = validateSignup(req.body);
  displayErrorMessages(error, res, next);
};

const loginValidation = async (req, res, next) => {
  const { error } = validateLogin(req.body);
  displayErrorMessages(error, res, next);
};

const checkUserExistance = async (req,res,next) => {

    const checkUser = await userExists('email',req.body.email);
    if (checkUser){
      const { dataValues } = checkUser;
      const password = await bcrypt.compare(req.body.password, dataValues.password);
      if(!password){
        return errorResponse(res, forbidden, wrongcredentials);
      }
      req.loginUser = _.omit(dataValues,'password');
      return next();
    }
    return errorResponse(res, forbidden, wrongcredentials);
}
const roleValidation = async (req, res, next) => {
  const { error } = validateRole(req.body);
  displayErrorMessages(error, res, next);
};

export default { signupValidation, checkUserExistance, loginValidation, roleValidation  };
