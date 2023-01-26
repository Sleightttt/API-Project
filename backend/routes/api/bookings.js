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
  return res.json(Bookings);
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

    await Bookings.update({
      startDate,
      endDate,
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

  if (
    checker.userId === req.user.dataValues.id ||
    spotChecker.ownerId === req.user.dataValues.id
  ) {
    await bookingToDelete.destroy();

    return res.json({ message: "Successfully deleted", statusCode: 200 });
  }

  return res.json({
    message: "Booking must belong to user or owner",
    statusCode: 404,
  });
});

module.exports = router;
