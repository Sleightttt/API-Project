"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
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
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          review: "1",
          stars: 1,
        },
        {
          spotId: 2,
          userId: 2,
          review: "2",
          stars: 2,
        },
        {
          spotId: 3,
          userId: 3,
          review: "3",
          stars: 3,
        },
        {
          spotId: 4,
          userId: 4,
          review: "4",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 5,
          review: "5",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 6,
          review: "6",
          stars: 3,
        },
        {
          spotId: 3,
          userId: 7,
          review: "7",
          stars: 3,
        },
        {
          spotId: 3,
          userId: 8,
          review: "8",
          stars: 3,
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
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options, null, {});
  },
};
