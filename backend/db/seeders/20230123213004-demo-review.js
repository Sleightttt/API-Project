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
          userId: 2,
          review:
            "Nam ultrices ipsum vitae quam suscipit, non semper ante bibendum. Donec consectetur sollicitudin eros quis faucibus. Quisque porta mauris eget leo molestie cursus. Vivamus vitae diam at mauris cursus maximus. Duis facilisis fermentum magna. Curabitur sit amet dui felis. Fusce vitae felis diam.",
          stars: 1,
        },
        {
          spotId: 2,
          userId: 2,
          review:
            "Nam ultrices ipsum vitae quam suscipit, non semper ante bibendum. Donec consectetur sollicitudin eros quis faucibus. Quisque porta mauris eget leo molestie cursus. Vivamus vitae diam at mauris cursus maximus. Duis facilisis fermentum magna. Curabitur sit amet dui felis. Fusce vitae felis diam.",
          stars: 2,
        },
        {
          spotId: 3,
          userId: 3,
          review:
            "Nam ultrices ipsum vitae quam suscipit, non semper ante bibendum. Donec consectetur sollicitudin eros quis faucibus. Quisque porta mauris eget leo molestie cursus. Vivamus vitae diam at mauris cursus maximus. Duis facilisis fermentum magna. Curabitur sit amet dui felis. Fusce vitae felis diam.",
          stars: 3,
        },
        {
          spotId: 4,
          userId: 4,
          review:
            "Nam ultrices ipsum vitae quam suscipit, non semper ante bibendum. Donec consectetur sollicitudin eros quis faucibus. Quisque porta mauris eget leo molestie cursus. Vivamus vitae diam at mauris cursus maximus. Duis facilisis fermentum magna. Curabitur sit amet dui felis. Fusce vitae felis diam.",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 5,
          review:
            "Nam ultrices ipsum vitae quam suscipit, non semper ante bibendum. Donec consectetur sollicitudin eros quis faucibus. Quisque porta mauris eget leo molestie cursus. Vivamus vitae diam at mauris cursus maximus. Duis facilisis fermentum magna. Curabitur sit amet dui felis. Fusce vitae felis diam.",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 6,
          review:
            "Nam ultrices ipsum vitae quam suscipit, non semper ante bibendum. Donec consectetur sollicitudin eros quis faucibus. Quisque porta mauris eget leo molestie cursus. Vivamus vitae diam at mauris cursus maximus. Duis facilisis fermentum magna. Curabitur sit amet dui felis. Fusce vitae felis diam.",
          stars: 3,
        },
        {
          spotId: 3,
          userId: 7,
          review:
            "Nam ultrices ipsum vitae quam suscipit, non semper ante bibendum. Donec consectetur sollicitudin eros quis faucibus. Quisque porta mauris eget leo molestie cursus. Vivamus vitae diam at mauris cursus maximus. Duis facilisis fermentum magna. Curabitur sit amet dui felis. Fusce vitae felis diam.",
          stars: 3,
        },
        {
          spotId: 3,
          userId: 8,
          review:
            "Nam ultrices ipsum vitae quam suscipit, non semper ante bibendum. Donec consectetur sollicitudin eros quis faucibus. Quisque porta mauris eget leo molestie cursus. Vivamus vitae diam at mauris cursus maximus. Duis facilisis fermentum magna. Curabitur sit amet dui felis. Fusce vitae felis diam.",
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
