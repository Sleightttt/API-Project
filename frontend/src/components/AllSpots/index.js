import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import "./AllSpots.css";

function Spots() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, []);

  const history = useHistory();

  let spotsloaded = false;

  let spts = useSelector((state) => state.spots.spots);
  if (spts) {
    spotsloaded = true;
    console.log(spts.Spots);
  }
  //   console.log(spotsloaded);
  let notLoaded = <div>Unable to load spots, please try again shortly</div>;

  return (
    <>
      {!spts && notLoaded}
      <div className="all-spots">
        <div> </div>
        <div className="spots-container">
          {spotsloaded &&
            spts.Spots.map((spot) => {
              return (
                <div
                  key={spot.id}
                  className="example-spot-card"
                  onClick={() => history.push(`/spots/${spot.id}`)}
                >
                  <img className="image-placeholder" src={spot.previewImage} />
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
                    <span className="bold">${spot.price}</span> night
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Spots;
