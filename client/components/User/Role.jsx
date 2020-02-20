import React, { Component } from "react";
import { Text, View } from "react-native";

const Role = props => {
  return (
    <View
      style={{
        backgroundColor: colour(this.props.role),
        alignSelf: "flex-start",
        padding: 5,
        flex: 1,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{capitalize(props.role)}</Text>
    </View>
  );
};

const capitalize = () => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const colour = () => {
  if (role == "manager") {
    return "#ffb9b0";
  }
  if (role == "employee") {
    return "#fff6b0";
  }
  return "#b1ffb0";
};

export default Role;
