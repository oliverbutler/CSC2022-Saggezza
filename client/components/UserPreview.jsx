import React, { Component } from "react";
import { View, Text } from "react-native";

export class UserPreview extends Component {
  render() {
    return (
      <View style={{ padding: 15 }}>
        <Text>First Name: {this.props.user.first_name}</Text>
        <Text>User Email: {this.props.user.email}</Text>
        <Text>Testing!</Text>
      </View>
    );
  }
}

export default UserPreview;