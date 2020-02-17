import React, { Component, useContext } from "react";

import { StyleSheet, View, Button, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import * as Google from "expo-google-app-auth";

import * as SecureStore from "expo-secure-store";

import AppContext from "../context/AppContext";

const signIn = async (navigation, dispatch) => {
  console.log("Started async");
  try {
    const result = await Google.logInAsync({
      // androidClientId: "YOUR_CLIENT_ID_HERE",
      iosClientId:
        "1040363071237-qtj1ukjm4vrod5fc9bm78vq2qmnhjcf0.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });
    if (result.type == "success") {
      dispatch({ type: "signIn", payload: result.user });
      console.log(result);
      SecureStore.setItemAsync("user", JSON.stringify(result.user));

      navigation.navigate("Drawer");
    }
  } catch (e) {
    console.log("error", e);
  }
  console.log("done");
};

const Login = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AppContext);

  return (
    <SafeAreaView style={style.container}>
      <Text h2>Login Page</Text>
      <View style={style.content}>
        <Text>{JSON.stringify(state)}</Text>
        <Button title="Skip" onPress={() => navigation.navigate("Drawer")} />
        <Button title="Sign In" onPress={() => signIn(navigation, dispatch)} />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    paddingTop: 20
  }
});

export default Login;
