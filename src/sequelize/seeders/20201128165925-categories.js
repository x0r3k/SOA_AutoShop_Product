'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: "Brake system",
        fkCategoryId: null
      },
      {
        id: 2,
        name: "Engine and exhaust system",
        fkCategoryId: null
      },
      {
        id: 3,
        name: "Suspension and steering",
        fkCategoryId: null
      },
      {
        id: 4,
        name: "Transmission",
        fkCategoryId: null
      },
      {
        id: 5,
        name: "Cooling and heating",
        fkCategoryId: null
      },
      {
        id: 6,
        name: "Electrics and lighting",
        fkCategoryId: null
      },
      {
        id: 7,
        name: "Body and components",
        fkCategoryId: null
      },
      {
        id: 8,
        name: "Auto-chemical goods",
        fkCategoryId: null
      },
      {
        id: 9,
        name: "Brake elements",
        fkCategoryId: 1
      },
      {
        id: 10,
        name: "Brake hydraulics",
        fkCategoryId: 1
      },
      {
        id: 11,
        name: "Electronic components",
        fkCategoryId: 1
      },
      {
        id: 12,
        name: "Engine parts",
        fkCategoryId: 2
      },
      {
        id: 13,
        name: "Turbines",
        fkCategoryId: 2
      },
      {
        id: 14,
        name: "Belts, chains and tensioners",
        fkCategoryId: 2
      },
      {
        id: 15,
        name: "Exhaust system",
        fkCategoryId: 2
      },
      {
        id: 16,
        name: "Filters",
        fkCategoryId: 2
      },
      {
        id: 17,
        name: "Fuel system",
        fkCategoryId: 2
      },
      {
        id: 18,
        name: "Suspension",
        fkCategoryId: 3
      },
      {
        id: 19,
        name: "Steering",
        fkCategoryId: 3
      },
      {
        id: 20,
        name: "Clutch",
        fkCategoryId: 4
      },
      {
        id: 21,
        name: "Transmission parts",
        fkCategoryId: 4
      },
      {
        id: 22,
        name: "Cooling",
        fkCategoryId: 5
      },
      {
        id: 23,
        name: "Air conditioning system",
        fkCategoryId: 5
      },
      {
        id: 24,
        name: "Heating system",
        fkCategoryId: 5
      },
      {
        id: 25,
        name: "Electrics",
        fkCategoryId: 6
      },
      {
        id: 26,
        name: "Lighting",
        fkCategoryId: 6
      },
      {
        id: 27,
        name: "Outer parts",
        fkCategoryId: 7
      },
      {
        id: 28,
        name: "Wiper system",
        fkCategoryId: 7
      },
      {
        id: 29,
        name: "Grease",
        fkCategoryId: 8
      },
      {
        id: 30,
        name: "Technical fluids",
        fkCategoryId: 8
      },
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};