import AppStack from "./navigation/AppStack.jsx";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppContext from "./context/AppContext";
import * as SecureStore from "expo-secure-store";

const initialState = {
  user: {},
  signedIn: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "signIn":
      return {
        user: action.payload,
        signedIn: true
      };
    case "signOut":
      return {
        user: {},
        signedIn: false
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
