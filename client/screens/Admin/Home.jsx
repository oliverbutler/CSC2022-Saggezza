import React, { Component, useEffect, useContext } from "react";

import { SafeAreaView, View } from "react-native";
import { Text, Button } from "react-native-elements";

import AppContext from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";

const getStored = async () => {
  SecureStore.getItemAsync("user").then(value => {
    return value;
  });
};

const Home = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <View style={{ alignSelf: "center" }}>
      <Text h2>Welcome {state.user.name}</Text>
      <Text>{JSON.stringify(state)}</Text>
    </View>
  );
};

export default Home;
