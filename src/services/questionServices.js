import models from '../models';

const { Question } = models;

class QuestionServices {
  static createQuestion = async (data) => {
    const {dataValues} = await Question.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      fields:[
        'question',
        'choices',
        'answer',
        'type',
        'createdAt',
        'updatedAt'
      ]
    });
    return dataValues;
  }
  static getAllQuestion = async () => {
    const allQuestion = await Question.findAll();
    return allQuestion;
  }
  static getQuestions = async () => {
    const allQuestion = await Question.findAll({attributes:['id','question','choices','type','createdAt']});
    return allQuestion;
  }
  static getQuestion = async (id) => {
    const allQuestion = await Question.findOne({ where: { id } });
    return allQuestion;
  }
  static getTypeQuestion = async (type) => {
    const allQuestion = await Question.findAll({ where: { type } });
    return allQuestion;
  }
  static deleteQuestion = async (id) => {
    const deletedQuestion = await Question.destroy(
      { where: { id: id } }
    );
    return deletedQuestion;
  }
  static updateQuestion = async (newData) => {
    const updatedQuestion = await Question.update(
      {
        question: newData.question,
        choices: newData.choices,
        answer: newData.answer,
      },
      { where: { id: newData.id } }
    );
    return updatedQuestion;
  };
}

export default QuestionServices;