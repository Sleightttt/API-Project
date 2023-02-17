import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewFormModal.css";
import { addReviewThunk } from "../../store/reviews";
import { useSelector } from "react-redux";

function ReviewFormModal({ props }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);

  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(
      addReviewThunk(
        {
          review,
          stars,
        },
        props,
        user
      )
    ).then(closeModal);

    // history.replace(`/spots/${props}`);
  };

  return (
    <>
      <div className="reviewModal">
        <h1>How was your stay?</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Description</label>
          <textarea
            className="review-textarea"
            placeholder="Write your review here"
            type="text"
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <div className="rate">
            <input
              onChange={(e) => setStars(e.target.value)}
              type="radio"
              id="star5"
              name="rate"
              value="5"
            />
            <label htmlFor="star5" title="text">
              5 stars
            </label>
            <input
              onChange={(e) => setStars(e.target.value)}
              type="radio"
              id="star4"
              name="rate"
              value="4"
            />
            <label htmlFor="star4" title="text">
              4 stars
            </label>
            <input
              onChange={(e) => setStars(e.target.value)}
              type="radio"
              id="star3"
              name="rate"
              value="3"
            />
            <label htmlFor="star3" title="text">
              3 stars
            </label>
            <input
              onChange={(e) => setStars(e.target.value)}
              type="radio"
              id="star2"
              name="rate"
              value="2"
            />
            <label htmlFor="star2" title="text">
              2 stars
            </label>
            <input
              onChange={(e) => setStars(e.target.value)}
              type="radio"
              id="star1"
              name="rate"
              value="1"
            />
            <label htmlFor="star1" title="text">
              1 star
            </label>
          </div>
          <button
            disabled={review.length < 10}
            type="submit"
            className="review-button-submit"
          >
            Submit Review
          </button>
        </form>
      </div>
    </>
  );
}

export default ReviewFormModal;
