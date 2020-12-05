'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('products', [
      {
        id: 1,
        name: "Brake Rotor 70111t",
        price: '85',
        discount: '0',
        amount: '40',
        fkCategoryId: 9
      },
      {
        id: 2,
        name: "FTE Brake Caliper RX609860A0",
        price: '83.4',
        discount: '0',
        amount: '31',
        fkCategoryId: 9
      },
      {
        id: 3,
        name: "Valucraft Brake Pads D43V",
        price: '88.2',
        discount: '0',
        amount: '30',
        fkCategoryId: 9
      },
      {
        id: 4,
        name: "New Master Cylinder NM",
        price: '107.4',
        discount: '0',
        amount: '11',
        fkCategoryId: 10
      },
      {
        id: 5,
        name: "URO Master Cylinder L4222745",
        price: '104.3',
        discount: '0',
        amount: '1',
        fkCategoryId: 10
      },
      {
        id: 6,
        name: "Brakeware Wheel Cylinder 33746",
        price: '119',
        discount: '0',
        amount: '16',
        fkCategoryId: 10
      },
      {
        id: 7,
        name: "Duralast ABS Pump/Motor 878744",
        price: '66.8',
        discount: '0',
        amount: '5',
        fkCategoryId: 11
      },
      {
        id: 8,
        name: "ABS Hydraulic Unit 3978R",
        price: '54.1',
        discount: '0',
        amount: '6',
        fkCategoryId: 11
      },
      {
        id: 9,
        name: "Camshaft Position Sensor 904-7129CD",
        price: '227.1',
        discount: '0',
        amount: '4',
        fkCategoryId: 12
      },
      {
        id: 10,
        name: "Encore Engine Solenoid SV-D20003",
        price: '224.1',
        discount: '0',
        amount: '4',
        fkCategoryId: 12
      },
      {
        id: 11,
        name: "Compressor Engine Oil Cooler 91D",
        price: '361.7',
        discount: '0',
        amount: '18',
        fkCategoryId: 13
      },
      {
        id: 12,
        name: "Timing Set 7820TR",
        price: '395.4',
        discount: '0',
        amount: '13',
        fkCategoryId: 14
      },
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};