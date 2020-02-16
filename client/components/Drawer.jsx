import React, { Component } from "react";

import {
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";
import { SafeAreaView, Image, StyleSheet } from "react-native";

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../assets/saggezza.png")} />
      <DrawerItemList {...props} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 10,
    alignSelf: "center"
  }
});
export default CustomDrawerContent;
