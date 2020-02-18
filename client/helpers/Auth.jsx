import React, { Component } from "react";
import axios from "axios";

import { decode } from "base-64";
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
      console.log(result.idToken);
      authGoogle(result.idToken, dispatch, navigation);
    }
  } catch (e) {
    console.log("error", e);
  }
};

const parseJWT = token => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    decode(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const authGoogle = (idToken, dispatch, navigation) => {
  axios
    .post("http://" + ip + ":5000/auth/google", { idToken: idToken })
    .then(res => {
      token = parseJWT(res.data.token);
      console.log(token);
      if (token.role == "pending") {
        alert("Account not activated");
      } else {
        SecureStore.setItemAsync("token", res.data.token);
        dispatch({ type: "signIn", payload: token });
        navigation.navigate("Drawer");
      }
    })
    .catch(err => {
      console.log("error", err);
    });
};

const authToken = (dispatch, navigation) => {
  SecureStore.getItemAsync("token").then(token => {
    if (token != null) {
      console.log("Stored token found");
      console.log(token);
      const instance = axios.create({
        baseURL: `http://${ip}:5000/`,
        timeout: 1000,
        headers: { Authorization: "Bearer " + token }
      });
      instance.get("/auth").then(() => {
        token = parseJWT(token);
        if (token.role == "pending") {
          alert("Account not activated");
          deleteToken();
        } else {
          dispatch({ type: "signIn", payload: token });
          navigation.navigate("Drawer");
        }
      });
    } else {
      console.log("Stored token not found");
    }
  });
};

const deleteToken = () => {
  SecureStore.deleteItemAsync("token");
};

export { signOut, oauth, authToken as tryAuth, deleteToken };
