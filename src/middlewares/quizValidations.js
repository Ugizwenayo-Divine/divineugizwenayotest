import { validateQuestion, displayErrorMessages } from '../helpers/validations';

const questionValidation = async (req, res, next) => {
  const { error } = validateQuestion(req.body);
  displayErrorMessages(error, res, next);
};
const updateValidation = async (req, res, next) => {
  // const {question} =req;
  let keys = Object.keys(req.body);
  let question = keys.find(key=> key == 'question');
  let answer = keys.find(key=> key == 'answer');
  let type = keys.find(key => key == 'type');
  const data = {
    question: question ? req.body.question : req.question.question,
    answer: answer ? req.body.answer : req.question.answer.toString(),
    type: type? req.body.type : req.question.type,
  }
  const { error } = validateQuestion(data);
  displayErrorMessages(error, res, next);
}


export default { questionValidation, updateValidation };
