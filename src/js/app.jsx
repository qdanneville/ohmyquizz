import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/home";

export default props => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(state => state.app.isLoaded);

  useEffect(() => {
    dispatch({ type: "SET_LOADED" });

    // api
    //   .get("/me")
    //   .then(resp => resp.data)
    //   .then(data => console.log(data));
  });

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <div className="app-wrapper">
      <h1>App wrapper</h1>
      <Home />
    </div>
  );
};
