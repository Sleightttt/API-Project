import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/AllSpots";
import GetOneSpot from "./components/GetOneSpot";
import CreateNewSpot from "./components/CreateNewSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Spots />
          </Route>
          <Route exact={true} path="/spots/:spotId">
            <GetOneSpot />
          </Route>
          <Route exact={true} path="/spots/create/new">
            <CreateNewSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
