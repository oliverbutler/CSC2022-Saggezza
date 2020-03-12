import React, { Component } from "react";
import axios from "axios";
import { Notifications } from "expo";
import { decode } from "base-64";
import * as Google from "expo-google-app-auth";
import AppContext from "../context/AppContext";
import * as SecureStore from "expo-secure-store";

const signOut = dispatch => {
  SecureStore.deleteItemAsync("token");
  dispatch({ type: "SIGN_OUT" });
};

const showGoogleAuth = async dispatch => {
  try {
    const result = await Google.logInAsync({
      androidClientId:
        "414892856589-vc0mglc2gku2pjooqpnejfl1i3g07tvf.apps.googleusercontent.com",
      iosClientId:
        "414892856589-blc94dbqjpgke3tm4amne4dcnd7amsht.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });
    if (result.type == "success") {
      const instance = axios.create({
        baseURL: ip
      });
      console.log(result.idToken);
      instance
        .post("/auth/google", { idToken: result.idToken })
        .then(res => {
          Notifications.getExpoPushTokenAsync().then(token => {
            console.log("token time bitches: ");
            console.log(token);
            instance
              .post("/push", { token: token })
              .then(res => console.log("success"));
          });

          if (res.data.status.type == "success") {
            SecureStore.setItemAsync("token", res.data.token);
            console.log(res.data.token);
            dispatch({ type: "SIGN_IN", user: res.data.user });
          } else {
            alert(res.data.status.text);
          }
        })
        .catch(e => console.log(e));
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

export { signOut, showGoogleAuth };
