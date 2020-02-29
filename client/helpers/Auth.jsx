import React, { Component } from "react";
import axios from "axios";

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
        "1040363071237-i276na9d415sc6uvgoj0129p0fot4lut.apps.googleusercontent.com",
      iosClientId:
        "1040363071237-qtj1ukjm4vrod5fc9bm78vq2qmnhjcf0.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });
    if (result.type == "success") {
      const instance = axios.create({
        baseURL: `http://${ip}:5000/`
      });
      instance.post("/auth/google", { idToken: result.idToken }).then(res => {
        if (res.data.status.type == "success") {
          SecureStore.setItemAsync("token", res.data.token);
          dispatch({ type: "SIGN_IN", user: res.data.user });
        } else {
          alert(res.data.status.text);
        }
      });
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
