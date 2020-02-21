import React, { Component } from "react";
import { Text, View } from "react-native";

const Role = props => {
  return (
    <View
      style={{
        backgroundColor: colour(props.role),
        padding: 8,
        margin: 10,
        flex: 1,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        {capitalize(props.role)}
      </Text>
    </View>
  );
};

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const colour = role => {
  if (role == "manager") {
    return "#ffb9b0";
  }
  if (role == "employee") {
    return "#fff6b0";
  }
  return "#b1ffb0";
};

export default Role;
