import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import { Image } from "react-native-elements";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

// Custom Component Imports
import Label from "../Label";

// Config Imports
import "../../secrets.js";

const dateConvert = date => {
  var unixTimestamp = date;
  date = new Date(unixTimestamp * 1000);
  return date.toString();
};

const RequestView = props => {
  const date = dateConvert(props.route.params.request.date_created.$date);
  return (
    <View>
      <Label label="Name">{props.route.params.request.name}</Label>
      <Label label="Date Created">{date}</Label>
    </View>
  );
};

export default RequestView;
