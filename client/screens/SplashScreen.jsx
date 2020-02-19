import React, { Component } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";

const SplashScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

export default SplashScreen;
