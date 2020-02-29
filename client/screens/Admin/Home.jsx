import React, { Component, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator
} from "react-native";
import AppContext from "../../context/AppContext";
import { axios } from "../../helpers/Axios";

import { Text, Button } from "react-native-elements";
import HomeLabel from "../../components/HomeLabel";

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
        <HomeLabel
          icon="users"
          number={state.users ? state.users.length : null}
          title="Users"
          onPress={() => navigation.navigate("Users")}
        />
        <HomeLabel
          icon="dollar-sign"
          number={state.requests ? state.requests.length : null}
          title="Requests"
          onPress={() => navigation.navigate("Requests")}
        />
        <HomeLabel
          icon="users"
          number={state.clients ? state.clients.length : null}
          title="Clients"
          onPress={() => navigation.navigate("Clients")}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
