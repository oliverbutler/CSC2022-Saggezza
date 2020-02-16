import React, { Component } from "react";

import {
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";
import { SafeAreaView, Image, StyleSheet, Text } from "react-native";

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#8a8a8a" }}>
        <Image
          style={styles.image}
          source={require("../assets/saggezza.png")}
        />

        <Text
          style={{
            paddingBottom: 10,
            fontSize: 22,
            textAlign: "center",
            color: "white"
          }}
        >
          {"Thomas Pal"}
        </Text>
      </SafeAreaView>

      <DrawerItemList {...props} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#91D000"
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 10,
    alignSelf: "center",
    marginTop: 20
  }
});
export default CustomDrawerContent;
