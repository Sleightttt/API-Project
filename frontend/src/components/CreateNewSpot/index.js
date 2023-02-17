import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";
import "./CreateNewSpot.css";
import { useHistory } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots";
import { useEffect } from "react";

function CreateNewSpot() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, []);

  const testFunc = async (resp) => {
    // console.log("this is the resp", resp);
    // const data = await resp.json();

    history.push(`/spots/${resp}`);
    ////the result of this is res.json is not a function
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(
      spotsActions.createSpotThunk({
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
      })
    )
      .then(testFunc)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      <div className="create-spot-container">
        <h1>Create a new Spot</h1>
        <h2> Where's your place Located?</h2>
        <h3>
          {" "}
          Guests will only get your exact address once they booked a reservation
        </h3>
        <form className="create-spot-form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li className="error" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          <label> Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            required
          ></input>
          <label>Street Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Address"
          ></input>
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="City"
          ></input>
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            placeholder="State"
          ></input>
          <label>Latitude</label>
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
            placeholder="Latitude"
          ></input>
          <label>Longitude</label>
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
            placeholder="Longitude"
          ></input>
          <label>Describe your place to guests</label>
          <div>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </div>
          <textarea
            className="create-spot-textarea"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Please enter at least 30 characters"
          ></textarea>
          <label>Create a title for your spot</label>
          <div>
            Catch guests' attention with a spot title that highlights what makes
            your place special
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name of your Spot"
          ></input>

          <label>Set a base price for your spot</label>
          <div>
            Competitive pricing can help your listing stand out and rank higher
            in search results
          </div>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Price per night (USD)"
          ></input>

          <label>Liven up your spot with photos</label>
          <div>Submit a link to at least one photo to publish your spot.</div>
          <input
            type="text"
            value={previewImg}
            onChange={(e) => setPreviewImg(e.target.value)}
            required
            placeholder="Preview Image URL"
            className="image-input"
          ></input>

          <button className="create-new-spot-button" type="submit">
            Create This Spot!
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateNewSpot;
