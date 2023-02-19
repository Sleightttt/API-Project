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
          address: "1111 test ave",
          city: "Chino",
          state: "California",
          country: "US",
          lat: 1,
          lng: 1,
          name: "The Test Spot1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget nisi eget ante suscipit molestie. Integer ullamcorper urna in velit consequat, ut iaculis ex sollicitudin. Donec nulla lectus, elementum malesuada cursus non, vehicula nec magna. Praesent vitae magna tempus nulla luctus ornare. Nullam ac magna lacinia, volutpat diam eget, facilisis dui. Vestibulum tristique consequat blandit. Aliquam at odio malesuada, accumsan magna nec, vehicula lectus. Aenean pretium libero eget iaculis tristique. Etiam et eleifend sem. Sed pretium risus et libero tristique, et lobortis elit lobortis. Sed eu risus non sapien varius volutpat at a tellus. Praesent placerat lorem metus, sit amet ultrices nunc tempus eget. Aliquam varius lorem vitae augue molestie cursus.",
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
          name: "The Test Spot2",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget nisi eget ante suscipit molestie. Integer ullamcorper urna in velit consequat, ut iaculis ex sollicitudin. Donec nulla lectus, elementum malesuada cursus non, vehicula nec magna. Praesent vitae magna tempus nulla luctus ornare. Nullam ac magna lacinia, volutpat diam eget, facilisis dui. Vestibulum tristique consequat blandit. Aliquam at odio malesuada, accumsan magna nec, vehicula lectus. Aenean pretium libero eget iaculis tristique. Etiam et eleifend sem. Sed pretium risus et libero tristique, et lobortis elit lobortis. Sed eu risus non sapien varius volutpat at a tellus. Praesent placerat lorem metus, sit amet ultrices nunc tempus eget. Aliquam varius lorem vitae augue molestie cursus.",
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
          name: "The Test Spot3",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget nisi eget ante suscipit molestie. Integer ullamcorper urna in velit consequat, ut iaculis ex sollicitudin. Donec nulla lectus, elementum malesuada cursus non, vehicula nec magna. Praesent vitae magna tempus nulla luctus ornare. Nullam ac magna lacinia, volutpat diam eget, facilisis dui. Vestibulum tristique consequat blandit. Aliquam at odio malesuada, accumsan magna nec, vehicula lectus. Aenean pretium libero eget iaculis tristique. Etiam et eleifend sem. Sed pretium risus et libero tristique, et lobortis elit lobortis. Sed eu risus non sapien varius volutpat at a tellus. Praesent placerat lorem metus, sit amet ultrices nunc tempus eget. Aliquam varius lorem vitae augue molestie cursus.",
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
          name: "The Test Spot4",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget nisi eget ante suscipit molestie. Integer ullamcorper urna in velit consequat, ut iaculis ex sollicitudin. Donec nulla lectus, elementum malesuada cursus non, vehicula nec magna. Praesent vitae magna tempus nulla luctus ornare. Nullam ac magna lacinia, volutpat diam eget, facilisis dui. Vestibulum tristique consequat blandit. Aliquam at odio malesuada, accumsan magna nec, vehicula lectus. Aenean pretium libero eget iaculis tristique. Etiam et eleifend sem. Sed pretium risus et libero tristique, et lobortis elit lobortis. Sed eu risus non sapien varius volutpat at a tellus. Praesent placerat lorem metus, sit amet ultrices nunc tempus eget. Aliquam varius lorem vitae augue molestie cursus.",
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
          name: "The Test Spot5",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget nisi eget ante suscipit molestie. Integer ullamcorper urna in velit consequat, ut iaculis ex sollicitudin. Donec nulla lectus, elementum malesuada cursus non, vehicula nec magna. Praesent vitae magna tempus nulla luctus ornare. Nullam ac magna lacinia, volutpat diam eget, facilisis dui. Vestibulum tristique consequat blandit. Aliquam at odio malesuada, accumsan magna nec, vehicula lectus. Aenean pretium libero eget iaculis tristique. Etiam et eleifend sem. Sed pretium risus et libero tristique, et lobortis elit lobortis. Sed eu risus non sapien varius volutpat at a tellus. Praesent placerat lorem metus, sit amet ultrices nunc tempus eget. Aliquam varius lorem vitae augue molestie cursus.",
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
          name: "The Test Spot6",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget nisi eget ante suscipit molestie. Integer ullamcorper urna in velit consequat, ut iaculis ex sollicitudin. Donec nulla lectus, elementum malesuada cursus non, vehicula nec magna. Praesent vitae magna tempus nulla luctus ornare. Nullam ac magna lacinia, volutpat diam eget, facilisis dui. Vestibulum tristique consequat blandit. Aliquam at odio malesuada, accumsan magna nec, vehicula lectus. Aenean pretium libero eget iaculis tristique. Etiam et eleifend sem. Sed pretium risus et libero tristique, et lobortis elit lobortis. Sed eu risus non sapien varius volutpat at a tellus. Praesent placerat lorem metus, sit amet ultrices nunc tempus eget. Aliquam varius lorem vitae augue molestie cursus.",
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
          name: "The Test Spot7",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget nisi eget ante suscipit molestie. Integer ullamcorper urna in velit consequat, ut iaculis ex sollicitudin. Donec nulla lectus, elementum malesuada cursus non, vehicula nec magna. Praesent vitae magna tempus nulla luctus ornare. Nullam ac magna lacinia, volutpat diam eget, facilisis dui. Vestibulum tristique consequat blandit. Aliquam at odio malesuada, accumsan magna nec, vehicula lectus. Aenean pretium libero eget iaculis tristique. Etiam et eleifend sem. Sed pretium risus et libero tristique, et lobortis elit lobortis. Sed eu risus non sapien varius volutpat at a tellus. Praesent placerat lorem metus, sit amet ultrices nunc tempus eget. Aliquam varius lorem vitae augue molestie cursus.",
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
