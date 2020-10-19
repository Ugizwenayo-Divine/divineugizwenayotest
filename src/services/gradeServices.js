import models from '../models';

const { Grade,User } = models;

class GradeServices {
  static createGrade = async (data) => {
    const {dataValues} = await Grade.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      fields:[
        'userId',
        'marks',
        'createdAt',
        'updatedAt'
      ]
    });
    return dataValues;
  }
  static getAllGrades = async () => {
    const allGrade = await Grade.findAll({ include: User });
    return allGrade;
  }
  static getUserGrades = async (id) => {
    const allGrade = await Grade.findAll({where:{userId:id}});
    return allGrade;
  }
  static getGrade = async (id) => {
    const allGrade = await Grade.findOne({ where: { id }});
    return allGrade;
  }
  static deleteGrade = async (id) => {
    const deletedGrade = await Grade.destroy(
      { where: { id: id } }
    );
    return deletedGrade;
  }
}

export default GradeServices;