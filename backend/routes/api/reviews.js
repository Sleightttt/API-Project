const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const { Spot, SpotImage, Review, ReviewImage } = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth");

router.get("/current", requireAuth, async (req, res, next) => {
  const reviewsByUser = await Review.findAll({
    where: {
      userId: req.user.dataValues.id,
    },
  });
  console.log(req.user.dataValues.id);
  return res.json(reviewsByUser);
});

module.exports = router;
