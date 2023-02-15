import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewFormModal.css";

function ReviewFormModal() {
  // const dispatch = useDispatch();
  // const [review, setReview] = useState("");
  // const [stars, setStars] = useState(1);
  // const [errors, setErrors] = useState([]);
  // const { closeModal } = useModal();

  // const demoHandler = () => {
  //   dispatch(
  //     sessionActions.login({ credential: "Demo-lition", password: "password" })
  //   ).then(closeModal);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   return dispatch(sessionActions.login({ credential, password }))
  //     .then(closeModal)
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //     });
  // };

  return (
    <>
      <div className="reviewModal">
        <h1>Post Your Review</h1>
        <form className="loginForm">
          <label>Description</label>
          <textarea
            className="review-textarea"
            placeholder="Write your review here"
            type="text"
          ></textarea>
          <label>Stars</label>
          <input type="text"></input>
        </form>
      </div>
    </>
  );
}

export default ReviewFormModal;
