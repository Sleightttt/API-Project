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

router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const updatedTime = new Date();
  const { startDate, endDate } = req.body;
  const Bookings = await Booking.findOne({
    where: {
      id: req.params.bookingId,
    },
  });
  await Bookings.update({
    startDate,
    endDate,
    updatedAt: updatedTime,
  });
  return res.json(Bookings);
});

router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const bookingToDelete = await Booking.findOne({
    where: {
      id: req.params.bookingId,
    },
  });
  await bookingToDelete.destroy();

  return res.json({ message: "Successfully deleted", statusCode: 200 });
});

module.exports = router;
