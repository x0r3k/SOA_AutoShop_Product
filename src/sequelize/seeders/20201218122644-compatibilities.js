'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('compatibilities', [
      {
        id: 1,
        fkProductId: 1,
        fkCarId: 1
      },
      {
        id: 2,
        fkProductId: 2,
        fkCarId: 1
      },
      {
        id: 3,
        fkProductId: 3,
        fkCarId: 1
      },
      {
        id: 4,
        fkProductId: 4,
        fkCarId: 1
      },
      {
        id: 5,
        fkProductId: 5,
        fkCarId: 1
      },
      {
        id: 6,
        fkProductId: 6,
        fkCarId: 1
      },
      {
        id: 7,
        fkProductId: 4,
        fkCarId: 2
      },
      {
        id: 8,
        fkProductId: 5,
        fkCarId: 2
      },
      {
        id: 9,
        fkProductId: 6,
        fkCarId: 2
      },
      {
        id: 10,
        fkProductId: 7,
        fkCarId: 2
      },
      {
        id: 11,
        fkProductId: 8,
        fkCarId: 2
      },
      {
        id: 12,
        fkProductId: 9,
        fkCarId: 2
      },
      {
        id: 13,
        fkProductId: 7,
        fkCarId: 3
      },
      {
        id: 14,
        fkProductId: 8,
        fkCarId: 3
      },
      {
        id: 15,
        fkProductId: 9,
        fkCarId: 3
      },
      {
        id: 16,
        fkProductId: 10,
        fkCarId: 3
      },
      {
        id: 17,
        fkProductId: 11,
        fkCarId: 3
      },
      {
        id: 18,
        fkProductId: 12,
        fkCarId: 3
      },
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('compatibilities', null, {});
  }
};