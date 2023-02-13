import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk } from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GetOneSpot.css";
import { getOneSpotReviewsThunk } from "../../store/reviews";

function GetOneSpot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  //   console.log(spotId);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
  }, []);

  useEffect(() => {
    dispatch(getOneSpotReviewsThunk(spotId));
  }, []);

  let spotLoaded = false;

  let spot = useSelector((state) => state.spots.oneSpot);

  if (spot) {
    spotLoaded = true;
  }
  //   console.log(spot);

  let reviews = useSelector((state) => state.reviews.reviews.Reviews);

  return (
    <>
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
                    ? spot.avgStarRating.toFixed(1)
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
              {spot.avgStarRating > 0 ? spot.avgStarRating.toFixed(1) : null}
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
            {reviews.map((review) => {
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
