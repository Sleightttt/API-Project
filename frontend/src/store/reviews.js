import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/getSpotReviews";
const ADD_REVIEW = "reviews/addReview";

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

const initialState = { spots: {}, user: {} };

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      newState = { ...state };
      let reviewData = {};
      action.oneSpotReviewsData.Reviews.forEach((review) => {
        reviewData[review.id] = review;
      });
      newState.spots = reviewData;

      return newState;

    case ADD_REVIEW:
      newState = { ...state };
      newState.spots[action.newReview.id] = action.newReview;
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
