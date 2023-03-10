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
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          reviewId: 1,
          url: "testurl1",
        },
        {
          reviewId: 2,
          url: "testurl2",
        },
        {
          reviewId: 3,
          url: "testurl3",
        },
        {
          reviewId: 4,
          url: "testurl4",
        },
        {
          reviewId: 5,
          url: "testurl5",
        },
        {
          reviewId: 6,
          url: "testurl6",
        },
        {
          reviewId: 7,
          url: "testurl7",
        },
        {
          reviewId: 8,
          url: "testurl8",
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
    options.tableName = "ReviewImages";
    return queryInterface.bulkDelete(options, null, {});
  },
};
