import Sequelize from 'sequelize';
import RepositoryModel from './Repository.js';
import ReleaseModel from './Release.js';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

const Repository = RepositoryModel(sequelize);
const Release = ReleaseModel(sequelize);

// Defining relations between models
Repository.hasMany(Release, { foreignKey: 'repositoryId', as: 'releases' });
Release.belongsTo(Repository, { foreignKey: 'repositoryId', as: 'repository' });

export { sequelize, Repository, Release };