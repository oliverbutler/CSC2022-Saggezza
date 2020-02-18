import React, { Component } from "react";
import axios from "axios";

import * as Google from "expo-google-app-auth";
import AppContext from "../context/AppContext";
import * as SecureStore from "expo-secure-store";

const signOut = (dispatch, navigation) => {
  console.log("Sign Out");
  dispatch({ type: "signOut" });
  SecureStore.deleteItemAsync("idToken");
  navigation.navigate("Login");
};

const oauth = async (dispatch, navigation) => {
  try {
    const result = await Google.logInAsync({
      // androidClientId: "YOUR_CLIENT_ID_HERE",
      iosClientId:
        "1040363071237-qtj1ukjm4vrod5fc9bm78vq2qmnhjcf0.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });
    if (result.type == "success") {
      SecureStore.setItemAsync("idToken", result.idToken);
      tryAuth(dispatch, navigation);
    }
  } catch (e) {
    console.log("error", e);
  }
};

const tryAuth = (dispatch, navigation) => {
  SecureStore.getItemAsync("idToken").then(token => {
    if (token != null) {
      console.log("Stored 'idToken' found");
      axios
        .post("http://" + ip + ":5000/auth", { idToken: token })
        .then(res => {
          if (res.data.user.role == "pending") {
            alert("Account not activated");
            deleteToken();
          } else {
            dispatch({ type: "signIn", payload: res.data.user });
            navigation.navigate("Drawer");
          }
        })
        .catch(err => {
          console.log("error", err);
        });
    } else {
      console.log("Stored idToken not found");
    }
  });
};

const deleteToken = () => {
  SecureStore.deleteItemAsync("idToken");
};

export { signOut, oauth, tryAuth, deleteToken };
