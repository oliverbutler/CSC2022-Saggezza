import AppStack from "./navigation/AppStack.jsx";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppContext from "./context/AppContext";

const initialState = {
  user: "Oliver",
  number: 20
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateNumber":
      return {
        ...state,
        number: action.payload
      };
    case "updateUser":
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <AppStack></AppStack>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
