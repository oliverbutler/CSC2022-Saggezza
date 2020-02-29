import React, { Component, useEffect, useContext } from "react";

import { SafeAreaView, View } from "react-native";
import { Text, Button } from "react-native-elements";
import { axios } from "../../helpers/Axios";
import AppContext from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";

const getStored = async () => {
  SecureStore.getItemAsync("user").then(value => {
    return value;
  });
};

const Home = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    axios().then(instance => {
      instance
        .get("/user")
        .then(res => {
          dispatch({ type: "SET_USERS", payload: res.data.users });
        })
        .catch(err => console.log(err));
      instance
        .get("/request")
        .then(res => {
          dispatch({ type: "SET_REQUESTS", payload: res.data.requests });
        })
        .catch(err => console.log(err));
      instance
        .get("/client")
        .then(res => {
          dispatch({ type: "SET_CLIENTS", payload: res.data.clients });
        })
        .catch(err => console.log(err));
      instance
        .get("/category")
        .then(res => {
          dispatch({ type: "SET_CATEGORIES", payload: res.data.categories });
        })
        .catch(err => console.log(err));
    });
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <Text h2>Welcome {state.user.first_name}</Text>
      <Text>{state.user.email}</Text>
    </View>
  );
};

export default Home;
