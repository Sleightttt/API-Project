import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk, getUserSpotsThunk } from "../../store/spots";
import "./ManageSpots.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotModal from "../DeleteSpotModal";

function ManageSpots() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserSpotsThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  let spotsLoaded = false;
  let userSpotArr;

  const userSpots = useSelector((state) => state.spots.userSpot);
  console.log("this is the users spots", userSpots);

  if (Object.values(userSpots).length) {
    spotsLoaded = true;
    userSpotArr = Object.values(userSpots);
  }

  console.log(userSpots);
  return (
    <>
      <div className="all-spots">
        <h1> Manage Spots</h1>
        <button
          className="create-new-spot-button"
          onClick={() => history.push("/spots/create/new")}
        >
          Create a new Spot!
        </button>
        <div className="spots-container">
          {spotsLoaded &&
            userSpotArr.map((spot) => {
              return (
                <div key={spot.id} className="manage-spot-card">
                  <img
                    onClick={() => history.push(`/spots/${spot.id}`)}
                    className="image-manage"
                    src={spot.previewImage}
                  />
                  <div className="city-review-box">
                    <div className="city-state">
                      {spot.city}, {spot.state}
                    </div>
                    <div className="star-rating">
                      <div className="star">
                        <i className="fas fa-star"></i>:
                      </div>
                      {spot.avgRating
                        ? Number(spot.avgRating).toFixed(1)
                        : "New"}
                    </div>
                  </div>
                  <div className="price">
                    <span className="bold">${spot.price}</span> night{" "}
                    <button
                      className="update-delete-button"
                      onClick={() => history.push(`/yourspots/${spot.id}`)}
                    >
                      Update Spot
                    </button>
                    <button className="update-delete-button">
                      <OpenModalMenuItem
                        className="login-signup"
                        itemText="Delete Spot"
                        modalComponent={<DeleteSpotModal props={spot.id} />}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default ManageSpots;
