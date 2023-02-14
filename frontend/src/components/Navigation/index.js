import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  // console.log(sessionUser);

  let loggedIn;

  if (sessionUser === null) {
    loggedIn = false;
  } else {
    loggedIn = true;
  }
  // console.log(loggedIn);

  const buttonClassName = "create-spot-button" + (loggedIn ? "" : " hidden");

  return (
    <div className="navbar">
      <div className="nav-container">
        <ul className="navItems">
          <li className="leftNav">
            <NavLink exact to="/">
              <img
                className="leftNav"
                src="https://static.dezeen.com/uploads/2014/07/Airbnb-rebrand-by-DesignStudio_dezeen_468_8.jpg"
              />
            </NavLink>
          </li>
          {isLoaded && (
            <li className="rightNav">
              {
                <button
                  onClick={() => history.push("/spots/create/new")}
                  className={buttonClassName}
                >
                  Create Spot
                </button>
              }
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
