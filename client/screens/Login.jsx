import React, { Component, useContext } from "react";

import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { Text, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import * as SecureStore from "expo-secure-store";
import AppContext from "../context/AppContext";
import axios from "axios";

import "../secrets";

import { oauth, tryAuth, deleteToken } from "../helpers/Auth";

const Login = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AppContext);

  React.useEffect(() => {
    tryAuth(dispatch, navigation);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text h2 h2Style={{ margin: 30 }}>
        Login with Google
      </Text>
      <Button
        title="Sign in With Google"
        titleStyle={{
          color: "black",
          fontFamily: "Arial",
          paddingLeft: 20,
          paddingRight: 20
        }}
        buttonStyle={styles.button}
        onPress={() => oauth(dispatch, navigation)}
        icon={
          <Image
            style={{ height: 35, width: 35 }}
            source={require("../assets/Google_G.png")}
          />
        }
      />
      <Button
        title="Purge Storage"
        type="clear"
        onPress={() => deleteToken()}
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
