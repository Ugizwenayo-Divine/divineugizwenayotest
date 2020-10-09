import Joi from '@hapi/joi';
import _ from 'lodash';
import responseHandlers from './responseHandlers';
import statusCodes from './statusCodes';
import customMessages from './customMessages';

const {
  invalidEmail,
  invalidFirstname,
  invalidGender,
  invalidLastname,
  invalidPassword,
  invalidType,
} = customMessages;

const { errorResponse } = responseHandlers;
const { badRequest } = statusCodes;

const validationMethods = (pattern, messages) => {
  const methods = Joi.string().regex(pattern).trim().required().messages(messages);
  return methods;
};
const displayErrorMessages = (error, res, next) => {
  if (error) {
    const { details } = error;
    const messages = details.map((err) => err.message.replace(/['"]/g, '')).join(', ');
    return errorResponse(res, badRequest, messages);
  }
  return next();
};
const validateSignup = (user) => {
  const schema = Joi.object({
    firstName: validationMethods(/^([a-zA-Z]{3,})+$/, {
      'string.pattern.base': `${invalidFirstname}`,
    }),
    lastName: validationMethods(/^([a-zA-Z]{3,})+$/, {
      'string.pattern.base': `${invalidLastname}`,
    }),
    email: validationMethods(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
      'string.pattern.base': `${invalidEmail}`,
    }),
    password: validationMethods(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?])[0-9a-zA-Z!@#$%^&*?]{8,}$/,
      { 'string.pattern.base': `${invalidPassword}` }
    ),
    gender: validationMethods(/^Male$|^male$|^Female$|^female$/, {
      'string.pattern.base': `${invalidGender}`,
    }),
  });
  return schema.validate(user, {
    abortEarly: false,
    allowUnknown: true,
  });
};
const validateLogin = (user) => {
  const schema = Joi.object({
    email: validationMethods(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
      'string.pattern.base': `${invalidEmail}`,
    }),
    password: validationMethods(/^/, { 'string.pattern.base': `${invalidPassword}` }),
  });
  return schema.validate(user, {
    abortEarly: false,
    allowUnknown: true,
  });
};
const validateRole = (data) => {
  const schema = Joi.object({
    type: validationMethods(/^client$|^Client$|^admin$|^Admin$/, {
      'string.pattern.base': `${invalidType}`,
    }),
    email: validationMethods(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
      'string.pattern.base': `${invalidEmail}`,
    }),
  });
  return schema.validate(data, {
    abortEarly: false,
    allowUnknown: true,
  });
};
const validateQuestion = (data) => {
  const schema = Joi.object({
    question: validationMethods(/(.*)/s, {
      'string.pattern.base': 'The question must not be empty',
    }),
    choices: Joi.array(),
    answer: Joi.array().required(),
    type: validationMethods(/^multiple$|^filling$|^matching$|^Multiple$|^Filling$|^Matching$/, {
      'string.pattern.base': 'The type must be eithe multiple or filling or matching',
    }),
  });
  return schema.validate(data, {
    abortEarly: false,
    allowUnknown: true,
  });
};
export {
  validateRole, 
  validateLogin, 
  validateSignup, 
  displayErrorMessages,
  validateQuestion,
}