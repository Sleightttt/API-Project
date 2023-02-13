const GET_ALL_SPOTS = "spots/getAllSpots";

const GET_ONE_SPOT = "spots/getOneSpot";

const getAllSpotsAction = (allSpotsData) => {
  return {
    type: GET_ALL_SPOTS,
    allSpotsData,
  };
};

const getOneSpotAction = (oneSpotData) => {
  return {
    type: GET_ONE_SPOT,
    oneSpotData,
  };
};

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const oneSpotData = await response.json();
    dispatch(getOneSpotAction(oneSpotData));
  }
};

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  //   console.log(response);
  if (response.ok) {
    const allSpotsData = await response.json();

    dispatch(getAllSpotsAction(allSpotsData));
  }
};

const initialState = { spots: null };

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = Object.assign({}, state);
      newState.spots = action.allSpotsData;
      console.log(newState);
      return newState;

    case GET_ONE_SPOT:
      newState = Object.assign({}, state);
      newState.oneSpot = action.oneSpotData;
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
