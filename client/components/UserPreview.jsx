import React, { Component } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export class UserPreview extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          padding: 15,
          backgroundColor: "lightgrey",
          marginTop: 5,
          marginHorizontal: 5,
          borderRadius: 5
        }}
      >
        <Text>
          Name: {this.props.user.first_name} {this.props.user.last_name}
        </Text>
        <Text>Email: {this.props.user.email}</Text>
        <Text>[{this.props.user.role}]</Text>
      </TouchableOpacity>
    );
  }
}

export default UserPreview;
