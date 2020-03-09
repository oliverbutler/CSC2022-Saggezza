import React, { Component, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator
} from "react-native";
import AppContext from "../context/AppContext";
import { axios } from "../helpers/Axios";

import { Text, Button } from "react-native-elements";
import HomeLabel from "../components/HomeLabel";

const Home = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    axios().then(instance => {
      instance
        .get("/category") //everyone
        .then(res => {
          dispatch({ type: "SET_CATEGORIES", payload: res.data.categories });
        })
        .catch(err => console.log(err));
      instance
        .get("/request") // everyone
        .then(res => {
          dispatch({ type: "SET_REQUESTS", payload: res.data.requests });
        })
        .catch(err => console.log(err));

      if (state.user.role == "admin") {
        instance
          .get("/client") // admin
          .then(res => {
            dispatch({ type: "SET_CLIENTS", payload: res.data.clients });
          })
          .catch(err => console.log(err));
        instance // admin, manager
          .get("/user")
          .then(res => {
            dispatch({ type: "SET_USERS", payload: res.data.users });
          })
          .catch(err => console.log(err));
        instance // admin, manager
          .get("/project")
          .then(res => {
            dispatch({ type: "SET_PROJECTS", payload: res.data.projects });
          })
          .catch(err => console.log(err));
      }
    });
  }, []);

  if (!state.user) return <Text></Text>;

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Text h2>Welcome {state.user.first_name}</Text>
      <View
        style={{
          marginLeft: 30,
          marginTop: 30,
          alignSelf: "flex-start"
        }}
      >
        {state.user.role == "admin" ? (
          <>
            <HomeLabel
              icon="users"
              number={state.users ? state.users.length : null}
              title="Users"
              onPress={() => navigation.navigate("Users")}
            />
            <HomeLabel
              icon="users"
              number={state.clients ? state.clients.length : null}
              title="Clients"
              onPress={() => navigation.navigate("Clients")}
            />
            <HomeLabel
              icon="user"
              number={state.projects ? state.projects.length : null}
              title="Projects"
              onPress={() => navigation.navigate("Projects")}
            />
          </>
        ) : (
          <></>
        )}
        <HomeLabel
          icon="dollar-sign"
          number={state.requests ? state.requests.length : null}
          title="Requests"
          onPress={() => navigation.navigate("Requests")}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
