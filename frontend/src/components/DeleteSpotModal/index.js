import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import "./DeleteSpotModal.css";

function DeleteSpotModal({ props }) {
  const dispatch = useDispatch();
  console.log(props);
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteSpotThunk(props)).then(closeModal);
  };
  return (
    <>
      <div className="deleteModal">
        <h1>Confirm Delete</h1>
        <h2>
          Are you <span className="orly">sure</span> you want to delete this
          spot?
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
export default DeleteSpotModal;
