const GET_ALL_SPOTS = "spots/getAllSpots";

const getAllSpotsAction = (allSpotsData) => {
  return {
    type: GET_ALL_SPOTS,
    allSpotsData,
  };
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
    default:
      return state;
  }
};

export default spotsReducer;
