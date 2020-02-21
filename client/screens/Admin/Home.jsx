import React, { Component, useEffect, useContext } from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { Text, Button } from "react-native-elements";

import AppContext from "../../context/AppContext";

import { axios } from "../../helpers/Axios";

const Home = ({ navigation }) => {
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
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Text h2>Welcome {state.user.first_name}</Text>
      <Text>{state.user.email}</Text>
      <View
        style={{
          marginLeft: 30,
          marginTop: 30,
          alignSelf: "flex-start"
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "lightblue",
            padding: 10,
            margin: 10,
            borderRadius: 10,
            alignSelf: "flex-start"
          }}
          onPress={() => navigation.navigate("Users")}
        >
          <Text h4>{state.users ? state.users.length : "..."} Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "lightgreen",
            padding: 10,
            margin: 10,
            borderRadius: 10
          }}
          onPress={() => navigation.navigate("Requests")}
        >
          <Text h4>
            {state.requests ? state.requests.length : "..."} Requests
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;
