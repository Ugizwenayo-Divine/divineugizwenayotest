import _ from 'lodash';
import QuestionService from '../services/questionServices';
import responseHandlers from '../helpers/responseHandlers';
import statusCodes from '../helpers/statusCodes';
import GradeService from '../services/gradeServices';
// import customMessages from '../helpers/customMessages';

const { successResponse, errorResponse } = responseHandlers;
const {
    createQuestion,
    deleteQuestion,
    getAllQuestion,
    getQuestion,
    updateQuestion,
    getQuestions,
    getTypeQuestion,
} = QuestionService;
const {
  createGrade
} = GradeService;
const {
  badRequest,
  created,
  ok,
} = statusCodes;

export default class QuestionController {

  static async saveQuestion(req, res) {
    let choices=[];
    let answers=[];
    try{
      // choices = req.body.choices.split(',');
      // answers = req.body.answer.split(',');
      // console.log(req.body,'ll',choices,answers);
      const data ={
        question:req.body.question,
        choices:req.body.choices,
        answer:req.body.answer,
        type:req.body.type
      }
      const savedQuestion = await createQuestion(data);
      return successResponse(res, created, 'Question created', null, savedQuestion);
    }
    catch(err){
      console.log(err,'llloop');
      errorResponse(res, badRequest, 'The Question already exists');
    } 
  }
  static getAll = async (req, res) => {
    try {
      const questions = await getAllQuestion();
      return successResponse(res, ok, 'All Questions', null, questions);
    } catch (error) {
      return errorResponse(res, badRequest, error);
    }
  };
  static getAllQuestions = async (req, res) => {
    try {
      const questions = await getQuestions();
      return successResponse(res, ok, 'All Questions', null, questions);
    } catch (error) {
      return errorResponse(res, badRequest, error);
    }
  };
  static getOneQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      const getOneQuestion = await getQuestion(id);
      return successResponse(res, ok, 'the Question', null, getOneQuestion);
    } catch (error) {
      return errorResponse(res, badRequest, error.message);
    }
  };
  static questionDeletion = async (req, res) => {
    const { id } = req.params;
    try{
      await deleteQuestion(id);
      return responseHandlers.successResponse(res, ok, 'Question is deleted');
    }
    catch(err){
      errorResponse(res, badRequest, err.message);
    }
  };
  static questionUpdation = async (req, res) => {
    try {
      const { id } = req.params;
      const { question } = req;
      const newData = {
        id,
        question: req.body.question || question.question,
        choices: req.body.choices.split(',') || question.choices,
        answer: req.body.answer.split(',') || question.answer,
      };
      await updateQuestion(newData);
      return successResponse(res, ok, 'updated', null, null);
    } catch (err) {
      return errorResponse(res, badRequest, err.message);
    }
  };  
  static getQuestionByType = async (req, res) => {
    try {
      const { type } = req.query;
      const getOneQuestion = await getTypeQuestion(type);
      return successResponse(res, ok, 'the Question', null, getOneQuestion);
    } catch (error) {
      return errorResponse(res, badRequest, error.message);
    }
  };
  static async quizCorrection(req, res) {
    const {sessionUser} = req;
    let result = [];
    try{
      const questions = await getAllQuestion();
      console.log(req.body.quizAnswer,'qq');
      questions.map(qst=>{
      req.body.quizAnswer.map((ans)=>{
        let data = null;
        console.log(ans.id,qst.id,'idans')
        if(parseInt(qst.id) === parseInt(ans.id)){
          const ansArr= [];
          qst.answer.forEach(ans=>{
            ansArr.push(JSON.parse(ans).value);
          });
          console.log(ans.answer,ansArr,'ans')
        if(JSON.stringify(ans.answer) === JSON.stringify(ansArr)){
          data = {
            id:ans.id,
            correct:true
          };
        }
        else{
          data = {
            id:ans.id,
            correct:false
          };
        }
        result.push(data);
      }
      });
    })
      if(result.length>0){
        let marks=0;
        result.map((rs)=>{
          if(rs.correct){
            marks+=1;
          }
        });
        const userMarks={
          userId:sessionUser.id,
          marks:`${marks}/${questions.length}`
        }
        const grades = await createGrade(userMarks);
      return successResponse(res, created, 'Results', null, grades);
      }
      return errorResponse(res, badRequest, 'Answer at least one question', null, null);
    }
    catch(err){
      console.log(err);
      errorResponse(res, badRequest, 'There occured an error');
    } 
  }
}
