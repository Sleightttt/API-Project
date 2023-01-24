const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const { Spot, SpotImage, Review } = require("../../db/models");

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

module.exports = router;
