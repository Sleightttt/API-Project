const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
  Booking,
} = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth");
const { Op } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateNewSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage("Please provide an address."),
  check("city")
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("Please provide a city"),
  check("state").isLength({ min: 2 }).withMessage("Please provide a state."),
  check("country")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Please provide a country."),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Please provide latitude."),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Please provide longitude."),
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name."),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a description."),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a price."),
  handleValidationErrors,
];

router.get("/", async (req, res) => {
  let query = {
    where: {},
  };

  const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
  const size = req.query.size === undefined ? 20 : parseInt(req.query.size);

  if (page > 10) throw new Error("page must be between 1 and 10");
  if (size > 20) throw new Error("size must be between 1 and 20");

  if (page >= 1 && size >= 1) {
    query.limit = size;
    query.offset = size * (page - 1);
  }
  //if only min lat
  if (req.query.minLat && !req.query.maxLat) {
    query.where.lat = { [Op.gte]: req.query.minLat };
  }
  //if only max lat
  if (req.query.maxLat && !req.query.minLat) {
    query.where.lat = { [Op.lte]: req.query.maxLat };
  }
  //if both min and max lat
  if (req.query.maxLat && req.query.minLat) {
    query.where.lat = { [Op.between]: [req.query.minLat, req.query.maxLat] };
  }
  //if only min lng
  if (req.query.minLng && !req.query.maxLng) {
    query.where.lng = { [Op.gte]: +req.query.minLng };
  }

  //only max lng
  if (req.query.maxLng && !req.query.minLng) {
    query.where.lng = { [Op.lte]: req.query.maxLng };
  }
  //both min and max lng
  if (req.query.maxLng && req.query.minLng) {
    query.where.lng = { [Op.between]: [req.query.minLng, req.query.maxLng] };
  }

  if (req.query.maxPrice && !req.query.minPrice) {
    if (req.query.maxPrice < 0) {
      return res.json({ Error: "max price must be above 0" });
    }
    query.where.price = { [Op.lte]: req.query.maxPrice };
  }

  if (req.query.minPrice && !req.query.maxPrice) {
    if (req.query.minPrice < 0) {
      return res.json({ Error: "min price must be above 0" });
    }
    query.where.price = { [Op.gte]: req.query.minPrice };
  }

  if (req.query.maxPrice && req.query.minPrice) {
    query.where.price = {
      [Op.between]: [req.query.minPrice, req.query.maxPrice],
    };
  }

  const spotts = await Spot.findAll(query);

  let spotsList = [];
  for (let spot of spotts) {
    let newSpot = spot.toJSON();

    let previewImg = await SpotImage.findOne({
      where: {
        spotId: newSpot.id,
        preview: true,
      },
    });

    if (previewImg) {
      newSpot.previewImage = previewImg.url;
    }

    let avgRate = await Review.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "stars"]],
    });
    newSpot.avgRating = avgRate[0].dataValues.stars;
    newSpot.page = page;
    newSpot.size = size;
    spotsList.push(newSpot);
  }

  return res.json({ Spots: spotsList });
});

router.get("/current", requireAuth, async (req, res) => {
  console.log(req.user.dataValues.id);

  const Spots = await Spot.findAll({
    where: {
      ownerId: req.user.dataValues.id,
    },
  });
  let spotsList = [];
  for (let spot of Spots) {
    let newSpot = spot.toJSON();

    let previewImg = await SpotImage.findOne({
      where: {
        spotId: newSpot.id,
        preview: true,
      },
    });
    if (previewImg) {
      newSpot.previewImage = previewImg.url;
    }

    let avgRate = await Review.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "stars"]],
    });
    newSpot.avgRating = avgRate[0].dataValues.stars;
    spotsList.push(newSpot);
  }

  return res.json({ Spots: spotsList });
});

router.get("/:spotId", async (req, res, next) => {
  const spotToGet = await Spot.findOne({
    where: {
      id: req.params.spotId,
    },
    include: [{ model: SpotImage, attributes: ["id", "url", "preview"] }],
  });

  if (!spotToGet) {
    res.statusCode = 404;
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  let resObj = spotToGet.toJSON();

  const findReviewsForSpot = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
  });

  resObj.numReviews = findReviewsForSpot.length;

  let avgRate = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "stars"]],
  });

  resObj.avgStarRating = avgRate[0].dataValues.stars;

  const ownerInfo = await User.findOne({
    where: {
      id: resObj.ownerId,
    },
    attributes: ["id", "firstName", "lastName"],
  });
  resObj.Owner = ownerInfo.dataValues;

  return res.json(resObj);
});

router.get("/:spotId/reviews", async (req, res, next) => {
  const spottt = await Spot.findOne({
    where: {
      id: req.params.spotId,
    },
  });

  if (!spottt) {
    res.statusCode = 404;
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const Reviews = await Review.findAll({
    where: {
      spotId: +req.params.spotId,
    },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });

  return res.json({ Reviews });
});

router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  let Bookings = await Booking.findAll({
    where: {
      spotId: req.params.spotId,
    },
    attributes: ["spotId", "startDate", "endDate"],
  });
  const spotLookup = await Spot.findOne({
    where: {
      id: req.params.spotId,
    },
  });

  if (!spotLookup) {
    res.statusCode = 404;
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  let checker = spotLookup.toJSON();

  if (req.user.dataValues.id === checker.ownerId) {
    const Bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
      include: [{ model: User }],
      attributes: [
        "id",
        "spotId",
        "userId",
        "startDate",
        "endDate",
        "createdAt",
        "updatedAt",
      ],
    });
    return res.json({ Bookings });
  }

  return res.json({ Bookings });
});

//create a spot

router.post("/", [requireAuth, validateNewSpot], async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const newSpot = await Spot.create({
    ownerId: req.user.dataValues.id,
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price,
  });
  const spotinfo = await Spot.findOne({ where: { id: newSpot.id } });

  return res.json(spotinfo);
});

//add an image to a spot based on the spots id

router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  let idForSpot = req.params.spotId;
  const { url, preview } = req.body;

  const findSpot = await Spot.findOne({
    where: {
      id: idForSpot,
    },
  });

  //if no spot is found
  if (!findSpot) {
    res.statusCode = 404;
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  let checker = findSpot.toJSON();
  //spot must belong to current user
  if (checker.ownerId !== req.user.dataValues.id) {
    res.statusCode = 400;
    return res.json({
      message: "You must own this spot to add an image",
      statusCode: 400,
    });
  }
  //create new spot image
  const newImg = await SpotImage.create({
    spotId: idForSpot,
    url,
    preview,
  });
  const info = newImg.toJSON();
  console.log(info);
  delete info.createdAt;
  delete info.updatedAt;
  delete info.spotId;

  return res.json(info);
});

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage("Please provide a review"),
  check("stars")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a star rating"),
  handleValidationErrors,
];

router.post(
  "/:spotId/reviews",
  [requireAuth, validateReview],
  async (req, res, next) => {
    const { review, stars } = req.body;

    const spot = await Spot.findOne({
      where: {
        id: req.params.spotId,
      },
    });

    if (!spot) {
      res.statusCode = 404;
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }

    const reviewCheck = await Review.findOne({
      where: {
        userId: req.user.dataValues.id,
        spotId: req.params.spotId,
      },
    });

    if (reviewCheck) {
      res.statusCode = 403;
      return res.json({
        message: "User already has a review for this spot",
        statusCode: 404,
      });
    }

    const newReview = await Review.create({
      userId: req.user.dataValues.id,
      spotId: req.params.spotId,
      review: review,
      stars: stars,
    });
    res.statusCode = 201;
    return res.json(newReview);
  }
);

const validateBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a start date"),
  check("endDate")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an end date"),
  handleValidationErrors,
];

router.post(
  "/:spotId/bookings",
  [requireAuth, validateBooking],
  async (req, res, next) => {
    const { startDate, endDate } = req.body;

    const spotLookup = await Spot.findOne({
      where: {
        id: req.params.spotId,
      },
    });

    if (!spotLookup) {
      res.statusCode = 404;
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }

    let checker = spotLookup.toJSON();
    //spot must not belong to the current user
    if (checker.ownerId === req.user.dataValues.id) {
      res.statusCode = 400;
      return res.json({
        message: "You must not own this spot to book it",
        statusCode: 400,
      });
    }

    const allBookingsForSpot = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
    });

    if (allBookingsForSpot) {
      for (let book of allBookingsForSpot) {
        let booksToJSON = book.toJSON();
        console.log(booksToJSON.startDate.split(" ")[0]);
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

    let newBooking = await Booking.create({
      spotId: req.params.spotId,
      userId: req.user.dataValues.id,
      startDate: startDate,
      endDate: endDate,
    });
    return res.json(newBooking);
  }
);

router.put(
  "/:spotId",
  [requireAuth, validateNewSpot],
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      res.statusCode = 404;
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }
    let checker = spot.toJSON();
    //spot must belong to current user
    if (checker.ownerId !== req.user.dataValues.id) {
      res.statusCode = 400;
      return res.json({
        message: "You must own this spot to edit",
        statusCode: 400,
      });
    }

    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    spot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    return res.json(spot);
  }
);

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spotToDelete = await Spot.findOne({
    where: { id: req.params.spotId },
  });

  if (!spotToDelete) {
    res.statusCode = 404;
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  let checker = spotToDelete.toJSON();
  //spot must belong to current user
  if (checker.ownerId !== req.user.dataValues.id) {
    res.statusCode = 400;
    return res.json({
      message: "You must own this spot to delete it",
      statusCode: 400,
    });
  }

  await spotToDelete.destroy();
  return res.json({ message: "Successfully deleted", statusCode: 200 });
});

module.exports = router;
