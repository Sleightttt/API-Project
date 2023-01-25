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

router.delete("/:imageId", requireAuth, async (req, res, next) => {
  imageToDelete = await ReviewImage.findOne({
    where: {
      id: req.params.imageId,
    },
  });

  await imageToDelete.destroy();

  return res.json({ message: "Successfully deleted", statusCode: 200 });
});

module.exports = router;
