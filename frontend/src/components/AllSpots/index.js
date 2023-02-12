import React, { useState, getState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import "./AllSpots.css";

function Spots() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, []);

  let spotsloaded = false;

  let spts = useSelector((state) => state.spots.spots);
  if (spts) {
    spotsloaded = true;
    // console.log(spts.Spots);
  }
  //   console.log(spotsloaded);
  return (
    <>
      <div className="all-spots">
        <div> All Spots Go Here</div>
        <div className="spots-container">
          {spotsloaded &&
            spts.Spots.map((spot) => {
              return (
                <div key={spot.id} className="example-spot-card">
                  <div className="image-placeholder">{spot.previewImage}</div>
                  <div className="city-review-box">
                    <div className="city-state">
                      {spot.city}, {spot.state}
                    </div>
                    <div className="star-rating">Star: {spot.avgRating}</div>
                  </div>
                  <div className="price"> ${spot.price} per night</div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Spots;
