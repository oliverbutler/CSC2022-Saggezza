// Libary Imports
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// Custom Component Imports
import Header from "../../components/Header";

// Config Import
import "../../secrets.js";

export class Requests extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Requests</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Requests;
