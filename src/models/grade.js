'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Grade.belongsTo(models.User, { foreignKey: 'userId' });
      // define association here
    }
  };
  Grade.init({
    userId: DataTypes.INTEGER,
    marks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Grade',
  });
  return Grade;
};