import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk, getOneSpotReviewsThunk } from "../../store/reviews";
import { getOneSpotThunk } from "../../store/spots";
import "./DeleteReviewModal.css";

function DeleteReviewModal(props, spotId) {
  const dispatch = useDispatch();
  console.log(props);
  const { closeModal } = useModal();

  const reviewHandler = () => {
    dispatch(getOneSpotThunk(props.spotId));
    dispatch(getOneSpotReviewsThunk(props.spotId));
    closeModal();
  };

  const handleDelete = (e) => {
    e.preventDefault();

    return dispatch(deleteReviewThunk(props.props)).then(reviewHandler);
  };
  return (
    <>
      <div className="deleteModal">
        <h1>Confirm Delete</h1>
        <h2>
          Are you <span className="orly">sure</span> you want to delete this
          review?
        </h2>
        <button className="delete-button" onClick={handleDelete}>
          OH YEAH
        </button>
        <button className="noThanks" onClick={closeModal}>
          OH NO
        </button>
      </div>
    </>
  );
}
export default DeleteReviewModal;
