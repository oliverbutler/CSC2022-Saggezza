import React, { Component } from "react";
import { Text, View } from "react-native";

const Status = props => {
  return (
    <View
      style={{
        backgroundColor: colour(props.status),
        padding: 10,
        borderRadius: 10
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{capitalize(props.status)}</Text>
    </View>
  );
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function colour(status) {
  if (status == "Declined") {
    return "#ffb9b0";
  }
  if (status == "Pending") {
    return "#fff6b0";
  }
  if (status == "Approved") {
    return "#99FF99";
  }
  return "#dddddd";
}

export default Status;
