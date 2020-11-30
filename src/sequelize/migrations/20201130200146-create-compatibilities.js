'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('compatibilities', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fkProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'fkProductId_fkCarId_unique',
        references: {
          model: {
            tableName: 'products',
            key: 'id',
          },
        },
      },
      fkCarId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'fkProductId_fkCarId_unique',
      },
    },
    {
      uniqueKeys: {
        fkProductId_fkCarId_unique: {
          customIndex: true,
          fields: ['fkProductId', 'fkCarId'],
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('compatibilities');
  }
};