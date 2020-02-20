import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const Label = props => {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold" }}>{props.label}: </Text>
      <Text>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 4
  }
});

export default Label;
