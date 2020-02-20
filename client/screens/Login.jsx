import React, { Component, useContext } from "react";

import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { Text, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import AppContext from "../context/AppContext";

import "../secrets";

import { showGoogleAuth } from "../helpers/Auth";

const Login = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text h2 h2Style={{ margin: 30 }}>
        Login with Google
      </Text>
      <Button
        title="Sign in With Google"
        titleStyle={{
          color: "black",
          paddingLeft: 20,
          paddingRight: 20
        }}
        buttonStyle={styles.button}
        onPress={() => showGoogleAuth(dispatch)}
        icon={
          <Image
            style={{ height: 35, width: 35 }}
            source={require("../assets/Google_G.png")}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 5
  }
});

export default Login;
