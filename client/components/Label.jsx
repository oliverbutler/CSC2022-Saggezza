import React, { Component } from "react";
import { Text, View } from "react-native";

export class Label extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>{this.props.label}: </Text>
        <Text>{this.props.children}</Text>
      </View>
    );
  }
}

export default Label;
