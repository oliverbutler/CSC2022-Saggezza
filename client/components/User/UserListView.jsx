// Library Imports
import React, { Component } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native-elements";

// Custom Component Imports
import Role from "./Role";
import Label from "../Label";

// Config Imports
import "../../secrets.js";

export class UserListView extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          padding: 15,
          backgroundColor: "lightgrey",
          marginTop: 5,
          marginHorizontal: 5,
          borderRadius: 5,
          flex: 1,
          flexDirection: "row"
        }}
      >
        <Image
          source={{
            uri:
              "http://" + ip + ":5000/static" + this.props.user.profile_picture
          }}
          style={{ width: 50, height: 50, marginRight: 10 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View>
          <Label label="Name">
            {this.props.user.first_name} {this.props.user.last_name}
          </Label>
          <Label label="Email">{this.props.user.email}</Label>
          <Role role={this.props.user.role} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default UserListView;
