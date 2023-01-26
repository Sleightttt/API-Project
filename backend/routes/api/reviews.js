const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const {
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  User,
} = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth");

router.get("/current", requireAuth, async (req, res, next) => {
  const Reviews = await Review.findAll({
    where: {
      userId: req.user.dataValues.id,
    },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: Spot },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });

  return res.json({ Reviews });
});

router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  ///check if review exists
  const reviewCheck = await Review.findOne({
    where: {
      id: req.params.reviewId,
    },
  });
  //if it doesnt, return error
  if (!reviewCheck) {
    res.statusCode = 404;
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  let checker = reviewCheck.toJSON();
  //check if review belongs to current user
  if (checker.userId !== +req.user.dataValues.id) {
    res.statusCode = 403;
    return res.json({
      message: "Review Must belong to user",
      statusCode: 404,
    });
  }
  //check how many review
  const howManyReviewImages = await ReviewImage.findAll({
    where: {
      reviewId: checker.id,
    },
  });

  if (howManyReviewImages.length) {
    if (howManyReviewImages.length > 9) {
      res.statusCode = 403;
      return res.json({
        message: "Maximum number of images for this resource was reached",
        statusCode: 404,
      });
    }
  }

  const { url } = req.body;
  const newImg = await ReviewImage.create({
    reviewId: req.params.reviewId,
    url,
  });

  const resInfo = newImg.toJSON();
  delete resInfo.reviewId;
  delete resInfo.createdAt;
  delete resInfo.updatedAt;
  return res.json(resInfo);
});

router.put("/:reviewId", requireAuth, async (req, res, next) => {
  const findReview = await Review.findOne({
    where: {
      id: req.params.reviewId,
    },
  });
  const { review, stars } = req.body;
  const updateTime = new Date();

  findReview.update({ review: review, stars: stars, updatedAt: updateTime });

  return res.json(findReview);
});

router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const reviewToDelete = await Review.findOne({
    where: {
      id: req.params.reviewId,
    },
  });

  await reviewToDelete.destroy();

  return res.json({ message: "Successfully deleted", statusCode: 200 });
});

module.exports = router;
