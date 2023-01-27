"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 5,
          userId: 1,
          startDate: "2024-1-11",
          endDate: "2024-1-12",
        },
        {
          spotId: 3,
          userId: 2,
          startDate: "2024-2-11",
          endDate: "2024-2-12",
        },
        {
          spotId: 1,
          userId: 3,
          startDate: "2024-3-11",
          endDate: "2024-3-12",
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2024-4-11",
          endDate: "2024-4-12",
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2024-5-11",
          endDate: "2024-5-12",
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2024-6-11",
          endDate: "2024-6-12",
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2024-7-11",
          endDate: "2024-7-12",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, null, {});
  },
};
