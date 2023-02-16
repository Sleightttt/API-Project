import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk } from "../../store/spots";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GetOneSpot.css";
import {
  getOneSpotReviewsThunk,
  getUsersReviewsThunk,
} from "../../store/reviews";
import ReviewFormModal from "../ReviewFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

function GetOneSpot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  //make fetch request for single spot

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);

  /////make fetch request for all reviews

  useEffect(() => {
    dispatch(getOneSpotReviewsThunk(spotId));
  }, [dispatch, spotId]);

  let spotLoaded = false;

  ////grabbing data from state
  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.oneSpot);
  console.log("this is the user", user);
  const reviews = useSelector((state) => state.reviews.spots);

  const reviewsArr = Object.values(reviews);

  ////declaring data checks
  let userId;
  let usersReview;
  let spotOwnedByUser;

  if (user) {
    userId = user.id;
  }

  useEffect(() => {
    dispatch(getUsersReviewsThunk(userId));
  }, []);

  if (spot) {
    spotLoaded = true;
  }

  let notLoaded = (
    <div>Unable to retrieve details, please try again shortly</div>
  );

  if (user && reviewsArr) {
    usersReview = reviewsArr.find((review) => review.userId === userId);
  }

  if (spot) spotOwnedByUser = spot.ownerId === userId;

  return (
    <>
      {!spotLoaded && notLoaded}
      {spotLoaded && (
        <div className="one-spot-container">
          <h1>{spot.name}</h1>
          <h2>
            {spot.city}, {spot.state}, {spot.country}
          </h2>
          <div className="one-spot-image-container">
            <div className="left-spot-img">
              <img
                className="preview-img"
                src={spot.SpotImages[0].url}
                alt="main property"
              ></img>
            </div>
            <div className="right-spot-img">
              {spot.SpotImages.map((img) => (
                <img
                  key={img.id}
                  className="right-image"
                  src={img.url}
                  alt="additional angles of property"
                />
              ))}
            </div>
          </div>
          <div className="about-box">
            <div className="about-box-left">
              <h2>
                Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
              </h2>
              <h3>{spot.description}</h3>
            </div>
            <div className="about-box-right">
              <div className="price-review-container">
                <div className="box-price">
                  Price ${spot.price}
                  <span className="perNight">&nbsp;per night</span>
                </div>{" "}
                <div className="box-review">
                  {" "}
                  <i className="fas fa-star"></i>&nbsp;
                  {spot.avgStarRating > 0
                    ? Number(spot.avgStarRating).toFixed(1)
                    : null}
                  &nbsp;&nbsp; {spot.numReviews === 0 ? "" : "•"} &nbsp;{" "}
                  {spot.numReviews > 0 ? spot.numReviews : null}{" "}
                  {spot.numReviews > 1
                    ? "Reviews"
                    : spot.numReviews === 0
                    ? "New"
                    : "Review"}
                </div>
              </div>
              <button
                className="booking-button"
                onClick={() => alert("Feature coming soon...")}
              >
                {" "}
                Reserve{" "}
              </button>
            </div>
          </div>
          <div className="review-box">
            <h1>
              <i className="fas fa-star"></i>&nbsp;
              {spot.avgStarRating > 0
                ? Number(spot.avgStarRating).toFixed(1)
                : null}
              &nbsp;&nbsp;
              {spot.numReviews === 0 ? "" : "•"} &nbsp;
              {spot.numReviews > 0 ? spot.numReviews : null}
              &nbsp;
              {spot.numReviews > 1
                ? "Reviews"
                : spot.numReviews === 0
                ? "New"
                : "Review"}{" "}
            </h1>
            {!usersReview && !spotOwnedByUser && userId && (
              <button className="open-review-button">
                <OpenModalMenuItem
                  className="login-signup"
                  itemText="Post Your Review"
                  modalComponent={<ReviewFormModal props={spotId} />}
                />
              </button>
            )}
            {spot.numReviews === 0 && userId && !spotOwnedByUser && (
              <div>Be the first to post a review!</div>
            )}
            {reviewsArr.map((review) => {
              return (
                <div key={review.id} className="single-review-container">
                  <div className="review-name">{review.User.firstName}</div>
                  <div className="review-updatedAt">{review.updatedAt}</div>
                  <div className="review-body"> {review.review}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default GetOneSpot;
