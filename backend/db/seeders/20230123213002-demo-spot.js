"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

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
          price: 111,
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
          price: 222,
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
          price: 333,
        },
        {
          ownerId: 3,
          address: "testaddress4",
          city: "testcity4",
          state: "teststate4",
          country: "testcountry4",
          lat: 4,
          lng: 4,
          name: "testname4",
          description: "testdescriptio4",
          price: 444,
        },
        {
          ownerId: 3,
          address: "testaddress5",
          city: "testcity5",
          state: "teststate5",
          country: "testcountry5",
          lat: 5,
          lng: 5,
          name: "testname5",
          description: "testdescriptio5",
          price: 555,
        },
        {
          ownerId: 3,
          address: "testaddress6",
          city: "testcity6",
          state: "teststate6",
          country: "testcountry6",
          lat: 6,
          lng: 6,
          name: "testname6",
          description: "testdescriptio6",
          price: 666,
        },
        {
          ownerId: 3,
          address: "testaddress7",
          city: "testcity7",
          state: "teststate7",
          country: "testcountry7",
          lat: 7,
          lng: 7,
          name: "testname7",
          description: "testdescriptio7",
          price: 777,
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
    return queryInterface.bulkDelete(options, null, {});
  },
};
