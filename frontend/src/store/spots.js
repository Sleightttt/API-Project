import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";

const GET_ONE_SPOT = "spots/getOneSpot";

const CREATE_SPOT = "/spots/createSpot";

const GET_USER_SPOTS = "/spots/getUserSpots";

const EDIT_USER_SPOT = "/spots/editUserSpot";

const DELETE_SPOT = "/spots/deleteSpot";

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

const getUserSpotsAction = (userSpotsData) => {
  return {
    type: GET_USER_SPOTS,
    userSpotsData,
  };
};

const editUserSpotAction = (editSpotData) => {
  return {
    type: EDIT_USER_SPOT,
    editSpotData,
  };
};

const deleteSpotAction = (spotToDelete) => {
  return {
    type: DELETE_SPOT,
    spotToDelete,
  };
};

///////////thunks/////////

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteSpotAction(spotId));
  }
};

export const editSpotThunk = (editSpotData, spotId) => async (dispatch) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImg,
  } = editSpotData;

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    }),
  });
  if (response.ok) {
    const editedSpotData = await response.json();

    const imagePost = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      body: JSON.stringify({
        url: previewImg,
        preview: true,
      }),
    });

    dispatch(editUserSpotAction(editedSpotData));
  }
};

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

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

export const getUserSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");

  if (response.ok) {
    const getUserSpotsData = await response.json();
    // console.log("user spots data", getUserSpotsData);
    dispatch(getUserSpotsAction(getUserSpotsData));
  }
};

////////////

const initialState = { spots: null, oneSpot: {}, userSpot: {} };

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      let allSpots = {};
      // console.log(action.allSpotsData);
      action.allSpotsData.Spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });

      newState = { ...state, spots: { ...allSpots } };
      // console.log(newState);
      return newState;

    case GET_ONE_SPOT:
      // console.log("=======", action.oneSpotData);
      let getSpot = action.oneSpotData;
      newState = { ...state, oneSpot: { ...getSpot } };
      // newState.oneSpot = action.oneSpotData;

      return newState;

    case CREATE_SPOT:
      let newSpot = action.spotToCreate;
      newState = { ...state, spots: { ...state.spots, newSpot } };

      // newState = Object.assign({}, state);
      // // console.log(action.spotToCreate);
      // newState.spots.Spots[action.spotToCreate] = action.spotToCreate;
      // // console.log(newState);
      return newState;

    case GET_USER_SPOTS:
      // console.log("-----", action.userSpotsData);
      let userSpotsInfo = {};
      action.userSpotsData.Spots.forEach((spot) => {
        userSpotsInfo[spot.id] = spot;
      });

      newState = { ...state, userSpot: { userSpotsInfo } };

      newState.userSpot = userSpotsInfo;
      return newState;

    //needs to be normalized

    case DELETE_SPOT:
      newState = {
        ...state,
        spots: { ...state.spots },
        userSpot: { ...state.userSpot },
      };
      delete newState.userSpot[action.spotToDelete];

      return newState;

    default:
      return state;
  }
};

export default spotsReducer;
