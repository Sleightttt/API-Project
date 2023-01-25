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

router.get("/", async (req, res) => {
  const spotts = await Spot.findAll({});

  let spotsList = [];
  for (let spot of spotts) {
    let newSpot = spot.toJSON();

    let previewImg = await SpotImage.findOne({
      where: {
        spotId: newSpot.id,
        preview: true,
      },
    });
    newSpot.previewImage = previewImg.url;

    let avgRate = await Review.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "stars"]],
    });
    newSpot.avgRating = avgRate[0].dataValues.stars;
    spotsList.push(newSpot);
  }

  return res.json({ spots: spotsList });
});

router.get("/current", [requireAuth, restoreUser], async (req, res) => {
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
    newSpot.previewImage = previewImg.url;

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

  let resObj = spotToGet.toJSON();

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
      Id: req.params.spotId,
    },
  });
  let checker = spotLookup.toJSON();

  if (req.user.dataValues.id === checker.ownerId) {
    const Bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
      include: { model: User },
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

router.post("/", [requireAuth, restoreUser], async (req, res, next) => {
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

router.post(
  "/:spotId/images",
  [requireAuth, restoreUser],
  async (req, res, next) => {
    let idForSpot = req.params.spotId;
    const { url, preview } = req.body;

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
  }
);

router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {
  const { review, stars } = req.body;

  const newReview = await Review.create({
    userId: req.user.dataValues.id,
    spotId: req.params.spotId,
    review: review,
    stars: stars,
  });
  return res.json(newReview);
});

router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body;

  let newBooking = await Booking.create({
    spotId: req.params.spotId,
    userId: req.user.dataValues.id,
    startDate,
    endDate,
  });
  return res.json(newBooking);
});

router.put("/:spotId", [requireAuth, restoreUser], async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

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
});

router.delete(
  "/:spotId",
  [requireAuth, restoreUser],
  async (req, res, next) => {
    const spotToDelete = await Spot.findOne({
      where: { id: req.params.spotId },
    });

    await spotToDelete.destroy();
    return res.json({ message: "Successfully deleted", statusCode: 200 });
  }
);

module.exports = router;
