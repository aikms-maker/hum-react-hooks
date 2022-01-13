import React, { useReducer, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import reducer from "../reducers";
import reducer from "../reducers";

import { EventForm } from "./EventForm";
import { Events } from "./Events";

import { AppContext } from "../contexts/AppContext";
import { Logs } from "./Logs";

const APP_KEY = "appWithRedux";

const App = () => {
  const appState = localStorage.getItem(APP_KEY);
  const initialState = JSON.parse(appState)
    ? JSON.parse(appState)
    : {
        events: [],
        operationLogs: [],
      };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(APP_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="container-fluid">
        <EventForm />
        <Events />
        <Logs />
      </div>
    </AppContext.Provider>
  );
};

export default App;
