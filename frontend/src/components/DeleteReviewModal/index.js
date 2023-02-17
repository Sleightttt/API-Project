import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import "./DeleteReviewModal.css";

function DeleteReviewModal({ props }) {
  const dispatch = useDispatch();
  console.log(props);
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteReviewThunk(props)).then(closeModal);
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
