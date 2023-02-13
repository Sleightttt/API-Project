import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk } from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GetOneSpot.css";

function GetOneSpot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  //   console.log(spotId);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
  }, []);

  let spotLoaded = false;

  let spot = useSelector((state) => state.spots.oneSpot);

  if (spot) {
    spotLoaded = true;
  }
  console.log(spot);

  return (
    <>
      {spotLoaded && (
        <div className="one-spot-container">
          <h1>{spot.name}</h1>
          <h2>
            {spot.city}, {spot.state}, {spot.country}
          </h2>
          <div className="one-spot-image-container">
            <div className="left-spot-img">
              <img className="preview-img" src={spot.SpotImages[0].url}></img>
            </div>
            <div className="right-spot-img">
              {spot.SpotImages.map((img) => (
                <img key={img.id} className="right-image" src={img.url} />
              ))}
            </div>
          </div>
          <div className="about-box">
            <div className="about-box-left">
              <h2>
                Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
              </h2>
              <h3>About goes here</h3>
            </div>
            <div className="about-box-right">
              <div className="booking-button-box">Booking button goes here</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GetOneSpot;
