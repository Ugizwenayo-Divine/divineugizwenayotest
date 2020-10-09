import dotenv from 'dotenv';
import models from '../models';
import authHelpers from '../helpers/authHelpers';

dotenv.config();

const { passwordHasher } = authHelpers;
const { User } = models;
const admin = {
  firstName: 'Ugizwenayo',
  lastName: 'Divine',
  email: 'ugizwenayo@gmail.com',
  gender: 'female',
  password: process.env.ADMIN_PASSWORD,
  type: 'admin',
  createdAt: new Date(),
  updatedAt: new Date(),
};
const registerAdmin = async (data) => {
  data.password = await passwordHasher(data.password);
  const { dataValues } = await User.create(data, {
    fields: [
      'firstName',
      'lastName',
      'email',
      'password',
      'gender',
      'type',
      'createAt',
      'updatedAt',
    ],
  });
  return dataValues;
};
registerAdmin(admin);
export default registerAdmin;
