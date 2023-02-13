const GET_SPOT_REVIEWS = "reviews/getSpotReviews";

const getOneSpotReviewsAction = (oneSpotReviewsData) => {
  return {
    type: GET_SPOT_REVIEWS,
    oneSpotReviewsData,
  };
};

export const getOneSpotReviewsThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const oneSpotReviewsData = await response.json();
    dispatch(getOneSpotReviewsAction(oneSpotReviewsData));
  }
};

const initialState = { reviews: { Reviews: null } };

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      newState = Object.assign({}, state);
      newState.reviews = action.oneSpotReviewsData;
      console.log(newState);
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
