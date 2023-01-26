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
  const imageToDelete = await ReviewImage.findOne({
    where: {
      id: req.params.imageId,
    },
  });

  if (!imageToDelete) {
    res.statusCode = 404;
    return res.json({
      message: "Review Image couldn't be found",
      statusCode: 404,
    });
  }

  let checker = imageToDelete.toJSON();

  const review = await Review.findOne({
    where: {
      id: checker.reviewId,
    },
  });

  let spotCheck = review.toJSON();

  if (spotCheck.userId !== req.user.dataValues.id) {
    res.statusCode = 403;
    return res.json({
      message: "Must own spot to delete",
      statusCode: 404,
    });
  }

  await imageToDelete.destroy();

  return res.json({ message: "Successfully deleted", statusCode: 200 });
});

module.exports = router;
