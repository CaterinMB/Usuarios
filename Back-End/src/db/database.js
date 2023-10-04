import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'demeter',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql' 
  }
);