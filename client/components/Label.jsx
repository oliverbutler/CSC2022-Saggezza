import React, { Component } from "react";
import { Text, View } from "react-native";

const Label = props => {
  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>{props.label}: </Text>
      <Text>{props.children}</Text>
    </View>
  );
};

export default Label;
