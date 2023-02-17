import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/getSpotReviews";
const ADD_REVIEW = "reviews/addReview";
const GET_USERS_REVIEWS = "reviews/getUsersReviews";
const DELETE_REVIEW = "/reviews/deleteReviews";

/////////////////////////////

const getOneSpotReviewsAction = (oneSpotReviewsData) => {
  return {
    type: GET_SPOT_REVIEWS,
    oneSpotReviewsData,
  };
};

const addReviewAction = (newReview) => {
  return {
    type: ADD_REVIEW,
    newReview,
  };
};

const getUsersReviewsAction = (userId) => {
  return {
    type: GET_USERS_REVIEWS,
    userId,
  };
};

const deleteReviewAction = (reviewToDelete) => {
  return {
    type: DELETE_REVIEW,
    reviewToDelete,
  };
};

/////////////////////////////

export const deleteReviewThunk = (reviewToDelete) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewToDelete}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteReviewAction(reviewToDelete));
  }
};

export const getOneSpotReviewsThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const oneSpotReviewsData = await response.json();

    dispatch(getOneSpotReviewsAction(oneSpotReviewsData));
  }
};

export const addReviewThunk = (newReview, spotId) => async (dispatch) => {
  const { review, stars } = newReview;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify({
      review,
      stars,
    }),
  });
  if (response.ok) {
    const newReviewData = await response.json();
    dispatch(addReviewAction(newReviewData));
  }
};

export const getUsersReviewsThunk = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/current`);

  if (response.ok) {
    const usersReviews = await response.json();

    dispatch(getUsersReviewsAction(usersReviews));
  }
};

const initialState = { spots: {}, user: {} };

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      let reviewData = {};
      action.oneSpotReviewsData.Reviews.forEach((review) => {
        reviewData[review.id] = review;
      });

      newState = { ...state, spots: { ...reviewData } };

      // newState.spots = reviewData;

      return newState;

    case ADD_REVIEW:
      let newRev = action.newReview;

      newState = { ...state, user: { ...state.user, newRev } };
      // newState.spots[action.newReview.id] = action.newReview;
      return newState;

    case GET_USERS_REVIEWS:
      newState = { ...state };
      let reviewData2 = {};
      // console.log(action.userId);
      action.userId.Reviews.forEach((review) => {
        reviewData2[review.id] = review;
      });
      newState.user = reviewData2;
      return newState;

    case DELETE_REVIEW:
      newState = { ...state, user: { ...state.user } };
      delete newState.user[action.reviewToDelete];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
