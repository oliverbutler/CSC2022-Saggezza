import React, { Component, useContext } from "react";

import { DrawerItemList } from "@react-navigation/drawer";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView
} from "react-native";
import { Divider } from "react-native-elements";

import AppContext from "../context/AppContext";

const CustomDrawerContent = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#94D500" }}>
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
          {props.name}
        </Text>
      </View>
      <Divider style={{ backgroundColor: "#94D500", height: 5 }} />
      <ScrollView>
        <DrawerItemList {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
