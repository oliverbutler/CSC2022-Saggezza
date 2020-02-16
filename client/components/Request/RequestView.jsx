import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import { Image } from "react-native-elements";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

// Custom Component Imports
import Label from "../Label";

// Config Imports
import "../../secrets.js";

class RequestView extends Component {
  state = {
    request: this.props.route.params.request
  };

  render() {
    return (
      <View>
        <Label label="Name">{this.state.request.name}</Label>
      </View>
    );
  }
}
export default RequestView;
