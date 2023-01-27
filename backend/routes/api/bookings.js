const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const {
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
  User,
} = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

router.get("/current", requireAuth, async (req, res, next) => {
  const Bookings = await Booking.findAll({
    where: {
      userId: req.user.dataValues.id,
    },
    include: {
      model: Spot,
      attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "price",
      ],
    },
  });

  if (!Bookings) {
    return res.json("no bookings exist yet for this user");
  }

  let bookingsArr = [];
  for (let book of Bookings) {
    let bookJSON = book.toJSON();

    let previewImg = await SpotImage.findOne({
      where: {
        spotId: bookJSON.spotId,
        preview: true,
      },
    });
    if (previewImg) {
      bookJSON.Spot.previewImage = previewImg.url;
    }
    bookingsArr.push(bookJSON);
  }

  return res.json({ Bookings: bookingsArr });
});

const validateBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a start date"),
  check("endDate")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an end date"),
  handleValidationErrors,
];

router.put(
  "/:bookingId",
  [requireAuth, validateBooking],
  async (req, res, next) => {
    const updatedTime = new Date();
    const { startDate, endDate } = req.body;
    const Bookings = await Booking.findOne({
      where: {
        id: req.params.bookingId,
      },
    });

    if (!Bookings) {
      res.statusCode = 404;
      return res.json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }

    //booking must belong to current user
    if (Bookings.userId !== req.user.dataValues.id) {
      res.statusCode = 403;
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }

    //body validation errors
    let startValid = new Date(startDate).getTime();
    let endValid = new Date(endDate).getTime();

    if (endValid < startValid) {
      res.statusCode = 400;
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          endDate: "endDate cannot come before startDate",
        },
      });
    }

    //checking all bookings at spot for conflicts
    const allBookingsForSpot = await Booking.findAll({
      where: {
        spotId: Bookings.spotId,
      },
    });

    let now = new Date().getTime();

    if (endValid < now || startValid < now) {
      res.statusCode = 403;
      return res.json({
        message: "Past bookings can't be modified",
        statusCode: 403,
      });
    }

    if (allBookingsForSpot) {
      for (let book of allBookingsForSpot) {
        let booksToJSON = book.toJSON();
        let startDateOfExistingBooking = new Date(
          booksToJSON.startDate.split(" ")[0]
        );

        let endDateDateOfExistingBooking = new Date(
          booksToJSON.endDate.split(" ")[0]
        );

        let startDateNew = new Date(startDate).getTime();
        let endDateNew = new Date(endDate).getTime();

        if (
          startDateNew <= endDateDateOfExistingBooking &&
          startDateNew >= startDateOfExistingBooking
        ) {
          return res.json({
            message:
              "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
              startDate: "Start date conflicts with an existing booking",
              endDate: "End date conflicts with an existing booking",
            },
          });
        }

        if (
          endDateNew <= endDateDateOfExistingBooking &&
          endDateNew >= startDateOfExistingBooking
        ) {
          return res.json({
            message:
              "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
              startDate: "Start date conflicts with an existing booking",
              endDate: "End date conflicts with an existing booking",
            },
          });
        }
      }
    }

    await Bookings.update({
      startDate: startDate,
      endDate: endDate,
      updatedAt: updatedTime,
    });
    return res.json(Bookings);
  }
);

router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const bookingToDelete = await Booking.findOne({
    where: {
      id: req.params.bookingId,
    },
  });

  if (!bookingToDelete) {
    res.statusCode = 404;
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  let checker = bookingToDelete.toJSON();

  const spot = await Spot.findOne({
    where: {
      id: bookingToDelete.spotId,
    },
  });

  let spotChecker = spot.toJSON();
  //check if user is deleting booking or owner is deleting booking
  if (
    checker.userId === req.user.dataValues.id ||
    spotChecker.ownerId === req.user.dataValues.id
  ) {
    let now = new Date().getTime();
    let bookStart = new Date(bookingToDelete.startDate).getTime();
    let bookEnd = new Date(bookingToDelete.endDate).getTime();

    if (now >= bookStart && now <= bookEnd) {
      res.statusCode = 403;
      res.json({
        message: "Bookings that have been started can't be deleted",
        statusCode: 403,
      });
    }

    await bookingToDelete.destroy();

    return res.json({ message: "Successfully deleted", statusCode: 200 });
  }

  return res.json({
    message: "Booking must belong to user or owner",
    statusCode: 404,
  });
});

module.exports = router;
