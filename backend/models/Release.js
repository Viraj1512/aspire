import { DataTypes } from 'sequelize';
export default (sequelize) => {
    return sequelize.define('Release', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      version: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      html_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  };