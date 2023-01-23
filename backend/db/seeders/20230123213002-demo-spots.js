"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "testaddress",
          city: "testcity",
          state: "teststate",
          country: "testcountry",
          lat: 1,
          lng: 1,
          name: "testname",
          description: "testdescription",
          price: 1,
        },
        {
          ownerId: 2,
          address: "testaddress2",
          city: "testcity2",
          state: "teststate2",
          country: "testcountry2",
          lat: 2,
          lng: 2,
          name: "testname2",
          description: "testdescription2",
          price: 2,
        },
        {
          ownerId: 3,
          address: "testaddress3",
          city: "testcity3",
          state: "teststate3",
          country: "testcountry3",
          lat: 3,
          lng: 3,
          name: "testname3",
          description: "testdescriptio3",
          price: 3,
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
    options.tableName = "Spots";
    return queryInterface.bulkDelete("Spots", null, {});
  },
};
