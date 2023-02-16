import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ManageReviews.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { getUsersReviewsThunk } from "../../store/reviews";

function ManageReviews() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.user);

  useEffect(() => {
    dispatch(getUsersReviewsThunk(user.id));
  }, []);

  const reviewsArr = Object.values(reviews);
  console.log(reviewsArr);

  return (
    <>
      <h1>Manage Reviews</h1>
      <div>
        {reviewsArr.map((review) => {
          return (
            <div key={review.id} className="single-review-container">
              <div className="review-name">{review.Spot.name}</div>
              <div className="review-updatedAt">{review.updatedAt}</div>
              <div className="review-body"> {review.review}</div>
              <div>
                <button className="edit-review-button">Edit Review</button>
                <button className="delete-review-button">Delete Review</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ManageReviews;
