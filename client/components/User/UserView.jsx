// Libary Imports
import React, { Component } from "react";
import { View, ScrollView, Button, RefreshControl } from "react-native";
import { Avatar, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { axios } from "../../helpers/Axios";

import AppContext from "../../context/AppContext";

// Config Imports
import "../../secrets.js";
import Role from "./Role";

const getProfile = user => {
  if (user.profile_picture != "") {
    return "http://" + ip + ":5000/static" + user.profile_picture;
  } else return "none";
};

const UserView = props => {
  const { state, dispatch } = React.useContext(AppContext);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);

  var user = {};
  if (props.route.params.myself) user = state.user;
  else user = state.users.find(user => user.id == props.route.params.id);

  const userRefresh = () => {
    setRefreshing(true);
    axios().then(instance => {
      instance
        .get("/user/" + user.id)
        .then(res => {
          dispatch({ type: "SET_USER", payload: res.data.user });
          setRefreshing(false);
        })
        .catch(err => console.log(err));
    });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={userRefresh} />
      }
    >
      <View style={{ alignSelf: "center", paddingTop: 15, padding: 10 }}>
        <Avatar
          rounded
          size="xlarge"
          title={user.first_name.charAt(0) + user.last_name.charAt(0)}
          // source={{
          //   uri: getProfile(this.state.user)
          // }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text h2>{user.first_name + " " + user.last_name}</Text>
        <Text>{user.email}</Text>
        <Role role={user.role} />
        {(() => {
          switch (user.role) {
            case "manager":
              return (
                // show list of the manager's employees, button is temporary
                // localhost:5000/user/this.state.user._id.$oid/employee
                // for getting a managers employees
                <Button
                  title="Users"
                  buttonStyle={{ margin: 5 }}
                  onPress={() => navigation.navigate("Users")}
                ></Button>
              );
            case "employee":
              return (
                // show list of the user's requests, button is temporary
                // localhost:5000/user/this.state.user._id.$oid/requests (not confirmed)
                // for getting a users requests
                <Button
                  title="Requests"
                  buttonStyle={{ margin: 5 }}
                  onPress={() => navigation.navigate("Requests")}
                ></Button>
              );
            default:
              return null;
          }
        })()}
      </View>
    </ScrollView>
  );
};

export default UserView;
