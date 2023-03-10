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
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

router.get("/current", requireAuth, async (req, res, next) => {
  const Reviews = await Review.findAll({
    where: {
      userId: req.user.dataValues.id,
    },
  });

  if (!Reviews) {
    return res.json("no reviews yet");
  }
  let reviewList = [];
  for (let review of Reviews) {
    let newReview = review.toJSON();

    let reviewSpot = await Spot.findOne({
      where: {
        id: newReview.spotId,
      },
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
    });

    if (reviewSpot) {
      let spotJSON = reviewSpot.toJSON();

      let previewImg = await SpotImage.findOne({
        where: {
          spotId: spotJSON.id,
          preview: true,
        },
      });
      if (previewImg) {
        spotJSON.previewImage = previewImg.url;
      }

      newReview.Spot = spotJSON;
    }
    //find user and add to review
    let reviewUser = await User.findOne({
      where: {
        id: newReview.userId,
      },
    });
    //if user add to review
    if (reviewUser) {
      let userJSON = reviewUser.toJSON();
      newReview.User = userJSON;
    }
    //find reviewimages and add to review
    let reviewImages = await ReviewImage.findAll({
      where: {
        reviewId: newReview.id,
      },
    });

    let reviewImageArr = [];
    for (let revImg of reviewImages) {
      let revImgJSON = revImg.toJSON();
      delete revImgJSON.createdAt;
      delete revImgJSON.updatedAt;
      delete revImgJSON.reviewId;
      reviewImageArr.push(revImgJSON);
    }
    newReview.ReviewImages = reviewImageArr;

    reviewList.push(newReview);
  }

  return res.json({ Reviews: reviewList });
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

const validateReviewParams = [
  check("review")
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage("Please provide a review"),
  check("stars")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a star rating"),
  handleValidationErrors,
];

router.put(
  "/:reviewId",
  [requireAuth, validateReviewParams],
  async (req, res, next) => {
    const findReview = await Review.findOne({
      where: {
        id: req.params.reviewId,
      },
    });

    if (!findReview) {
      res.statusCode = 404;
      return res.json({
        message: "Review couldn't be found",
        statusCode: 404,
      });
    }

    let checker = findReview.toJSON();
    //check if review belongs to current user
    if (checker.userId !== +req.user.dataValues.id) {
      res.statusCode = 403;
      return res.json({
        message: "Review Must belong to user",
        statusCode: 404,
      });
    }

    const { review, stars } = req.body;
    const updateTime = new Date();

    findReview.update({ review: review, stars: stars, updatedAt: updateTime });

    return res.json(findReview);
  }
);

router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const reviewToDelete = await Review.findOne({
    where: {
      id: req.params.reviewId,
    },
  });

  if (!reviewToDelete) {
    res.statusCode = 404;
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  let checker = reviewToDelete.toJSON();
  //check if review belongs to current user
  if (checker.userId !== +req.user.dataValues.id) {
    res.statusCode = 403;
    return res.json({
      message: "Review Must belong to user",
      statusCode: 404,
    });
  }

  await reviewToDelete.destroy();

  return res.json({ message: "Successfully deleted", statusCode: 200 });
});

module.exports = router;
