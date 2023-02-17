import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ManageReviews.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { getUsersReviewsThunk } from "../../store/reviews";
import DeleteReviewModal from "../DeleteReviewModal";

function ManageReviews() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.user);

  useEffect(() => {
    dispatch(getUsersReviewsThunk(user.id));
  }, [dispatch, user.id]);

  const reviewsArr = Object.values(reviews);
  console.log("this is reviews arr", reviewsArr);

  // const delReviewButton = (id) => {
  //   dispatch(deleteReviewThunk(id));
  // };

  let noReviews = <div>Please visit a spot to post a review</div>;

  return (
    <>
      <h1>My Reviews</h1>
      {!reviewsArr.length && noReviews}
      <div>
        {reviewsArr.map((review) => {
          return (
            <div key={review.id} className="single-review-container">
              <div className="review-name">{review.Spot.name}</div>
              <div className="review-updatedAt">{review.updatedAt}</div>
              <div className="review-body"> {review.review}</div>
              <div>
                <button className="delete-review-button">
                  <OpenModalMenuItem
                    className="login-signup"
                    itemText="Delete Review"
                    modalComponent={<DeleteReviewModal props={review.id} />}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ManageReviews;
