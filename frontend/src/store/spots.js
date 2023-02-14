import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";

const GET_ONE_SPOT = "spots/getOneSpot";

const CREATE_SPOT = "/spots/createSpot";

////////////actions//////////

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

const createSpotAction = (spotToCreate) => {
  return {
    type: CREATE_SPOT,
    spotToCreate,
  };
};

///////////thunks/////////

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const oneSpotData = await response.json();
    dispatch(getOneSpotAction(oneSpotData));
  }
};

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    const allSpotsData = await response.json();

    dispatch(getAllSpotsAction(allSpotsData));
  }
};

export const createSpotThunk = (spotToCreate) => async (dispatch) => {
  const {
    country,
    address,
    city,
    state,
    lng,
    lat,
    description,
    name,
    price,
    previewImg,
    image,
  } = spotToCreate;

  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      country,
      address,
      city,
      state,
      lng,
      lat,
      description,
      name,
      price,
    }),
  });

  if (response.ok) {
    const newSpotData = await response.json();

    const newSpotId = newSpotData.id;

    const imagePost = await csrfFetch(`/api/spots/${newSpotId}/images`, {
      method: "POST",
      body: JSON.stringify({
        url: previewImg,
        preview: true,
      }),
    });

    dispatch(createSpotAction(newSpotData));

    return newSpotId;
  }
};

const initialState = { spots: null };

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = Object.assign({}, state);
      newState.spots = action.allSpotsData;
      // console.log(newState);
      return newState;

    case GET_ONE_SPOT:
      newState = Object.assign({}, state);
      newState.oneSpot = action.oneSpotData;
      return newState;

    case CREATE_SPOT:
      newState = Object.assign({}, state);
      // console.log(action.spotToCreate);
      newState.spots.Spots[action.spotToCreate] = action.spotToCreate;
      // console.log(newState);
      return newState;

    default:
      return state;
  }
};

export default spotsReducer;
