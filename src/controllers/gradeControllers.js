import GradeService from '../services/gradeServices';
import responseHandlers from '../helpers/responseHandlers';
import statusCodes from '../helpers/statusCodes';

const { successResponse, errorResponse } = responseHandlers;
const {
    deleteGrade,
    getAllGrades,
    getUserGrades,
    getGrade,
} = GradeService;
const {
  badRequest,
  ok,
} = statusCodes;

export default class GradeController {
  
  static getAll = async (req, res) => {
    try {
      const grades = await getAllGrades();
      return successResponse(res, ok, 'All Grades', null, grades);
    } catch (error) {
      return errorResponse(res, badRequest, error);
    }
  };
  static getAllUserGrades = async (req, res) => {
    const {sessionUser}= req;
    try {
      const grades = await getUserGrades(sessionUser.id);
      return successResponse(res, ok, 'All user grades', null, grades);
    } catch (error) {
      return errorResponse(res, badRequest, error);
    }
  };
  static getOneGrade = async (req, res) => {
    try {
      const { id } = req.params;
      const getOneGrade = await getGrade(id);
      return successResponse(res, ok, 'the grade', null, getOneGrade);
    } catch (error) {
      return errorResponse(res, badRequest, error.message);
    }
  };
  static gradeDeletion = async (req, res) => {
    const { id } = req.params;
    try{
      await deleteGrade(id);
      return responseHandlers.successResponse(res, ok, 'Grade is deleted');
    }
    catch(err){
      errorResponse(res, badRequest, err.message);
    }
  };
  
}
