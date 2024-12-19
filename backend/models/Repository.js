import { DataTypes } from 'sequelize';

export default (sequelize) => {
    return sequelize.define('Repository', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      html_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  };