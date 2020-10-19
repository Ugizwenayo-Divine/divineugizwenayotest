import responseHandler from '../helpers/responseHandlers';
import statusCode from '../helpers/statusCodes';
import GradeService from '../services/gradeServices';
import QuestionService from '../services/questionServices';


const { errorResponse } = responseHandler;
const { unAuthorized } = statusCode;
const {getGrade} = GradeService;
const {getQuestion} = QuestionService;

const doesGradeExist = async (req, res, next) => {
  const { id } = req.params;
  const grade = await getGrade(id);
  if (!grade) {
    return errorResponse(res, unAuthorized, 'The grade does not exist');
  }
  return next();
};
const doesQuestionExist = async (req, res, next) => {
    const { id } = req.params;
    const question = await getQuestion(id);
    if (!question) {
      return errorResponse(res, unAuthorized, 'The question does not exist');
    }
    req.question=question;
    return next();
  };

export default { doesGradeExist, doesQuestionExist };
