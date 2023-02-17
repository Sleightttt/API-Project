import { useDispatch, useSelector } from "react-redux";
import { editSpotThunk, getOneSpotThunk } from "../../store/spots";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function EditSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  // const [correct, setCorrect] = useState(false);

  useEffect(() => {
    const prefillFunc = async () => {
      const spot = await dispatch(getOneSpotThunk(spotId));
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      console.log("this is the owner id", spot.ownerId);
      console.log("this is the user id", user.id);
      setDescription(spot.description);
      setName(spot.name);
      setPrice(spot.price);
      setPreviewImg(spot.SpotImages[0].url ? spot.SpotImages[0].url : "");

      if (!(user.id == spot.ownerId)) {
        history.push("/");
      }
    };

    prefillFunc();
  }, [dispatch, spotId]);

  const user = useSelector((state) => state.session.user);

  let userId;
  if (user) {
    userId = user.id;
  }

  let spotLoaded = false;

  const spot = useSelector((state) => state.spots.oneSpot);
  console.log("this be the spot", spot);
  // console.log("current store spot id", spot.id);
  // console.log("edit page  spot id", spotId);

  //redirect not logged in users or not spot owners
  // console.log(spot.ownerId, userId);

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  const handleRedirect = async () => {
    history.push(`/spots/${spotId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    return dispatch(
      editSpotThunk(
        {
          country,
          address,
          city,
          state,

          description,
          name,
          price,
          previewImg,
        },
        spotId
      )
    ).then(handleRedirect);
  };

  if (spot) spotLoaded = true;

  const notLoadedYet = (
    <div>Unable to retrieve details, please try again shortly</div>
  );

  return (
    <>
      {!spotLoaded && !spot && notLoadedYet}
      {spotLoaded && (
        <div>
          <div className="create-spot-container">
            <h1>Update Your Spot</h1>
            <h2> Where's your place Located?</h2>
            <h3>
              {" "}
              Guests will only get your exact address once they booked a
              reservation
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
              {/* <label>Latitude</label>
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
              ></input> */}
              <label>Describe your place to guests</label>
              <div>
                Mention the best features of your space, any special amentities
                like fast wifi or parking, and what you love about the
                neighborhood.
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
                Catch guests' attention with a spot title that highlights what
                makes your place special
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
                Competitive pricing can help your listing stand out and rank
                higher in search results
              </div>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Price per night (USD)"
              ></input>

              <label>Liven up your spot with photos</label>
              <div>
                Submit a link to at least one photo to publish your spot.
              </div>
              <input
                type="text"
                value={previewImg}
                onChange={(e) => setPreviewImg(e.target.value)}
                required
                placeholder="Preview Image URL"
                className="image-input"
              ></input>

              <button className="create-new-spot-button" type="submit">
                Update Your Spot
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditSpot;
