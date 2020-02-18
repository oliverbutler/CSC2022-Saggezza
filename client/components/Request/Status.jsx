import React, { Component } from "react";
import { Text, View } from "react-native";

export class Status extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: colour(this.props.status),
          alignSelf: "flex-start",
          padding: 5,
          flex: 1,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          {capitalize(this.props.status)}
        </Text>
      </View>
    );
  }
}

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
  return "#b1ffb0";
}

export default Status;
