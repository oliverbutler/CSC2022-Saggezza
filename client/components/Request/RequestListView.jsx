import React, { Component } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native-elements";

import Label from "../Label";
import RequestStatus from "./RequestStatus";

import "../../secrets";

export class ApplicationsPreview extends Component {
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
        <View>
          <Label label="Name">{this.props.request.name}</Label>
          <Label label="Employee ID">{this.props.request.employee.$oid}</Label>

          <Label label="Date Created">
            {/* {this.props.request.date_created.$date} */}
          </Label>

          <RequestStatus status={this.props.request.status} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default ApplicationsPreview;
