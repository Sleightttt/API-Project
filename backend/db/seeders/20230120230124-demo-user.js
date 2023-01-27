"use strict";
/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Bob",
          lastName: "Bobs",
        },
        {
          email: "user1@user.io",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
          firstName: "Bob2",
          lastName: "Bobs2",
        },
        {
          email: "user2@user.io",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password3"),
          firstName: "Bob3",
          lastName: "Bobs3",
        },
        {
          email: "user4@user.io",
          username: "FakeUser4",
          hashedPassword: bcrypt.hashSync("password4"),
          firstName: "Bob3",
          lastName: "Bobs3",
        },
        {
          email: "user5@user.io",
          username: "FakeUser5",
          hashedPassword: bcrypt.hashSync("password5"),
          firstName: "Bob5",
          lastName: "Bobs3",
        },
        {
          email: "user6@user.io",
          username: "FakeUser6",
          hashedPassword: bcrypt.hashSync("password6"),
          firstName: "Bob6",
          lastName: "Bobs3",
        },
        {
          email: "user7@user.io",
          username: "FakeUser7",
          hashedPassword: bcrypt.hashSync("password7"),
          firstName: "Bob7",
          lastName: "Bobs3",
        },
        {
          email: "user2@user.io",
          username: "FakeUser8",
          hashedPassword: bcrypt.hashSync("password8"),
          firstName: "Bob8",
          lastName: "Bobs3",
        },
        {
          email: "user2@user.io",
          username: "FakeUser9",
          hashedPassword: bcrypt.hashSync("password9"),
          firstName: "Bob3",
          lastName: "Bobs3",
        },
        {
          email: "user2@user.io",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password9"),
          firstName: "Bob3",
          lastName: "Bobs3",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
