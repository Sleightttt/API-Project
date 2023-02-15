import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewFormModal.css";
import { addReviewThunk } from "../../store/reviews";

function ReviewFormModal({ props }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);

  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(
      addReviewThunk(
        {
          review,
          stars,
        },
        props
      )
    ).then(closeModal);

    // history.replace(`/spots/${props}`);
  };

  return (
    <>
      <div className="reviewModal">
        <h1>Post Your Review</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Description</label>
          <textarea
            className="review-textarea"
            placeholder="Write your review here"
            type="text"
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <label>Stars</label>
          <input type="text" onChange={(e) => setStars(e.target.value)}></input>
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
