import React, { Component } from "react";
import { ListItem } from "react-native-elements";
import Status from "./Status";
import {
  RefreshControl,
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet
} from "react-native";

import "../../secrets";

const RequestParamListView = props => {
  const dateConvert = date => {
    var newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <ListItem
      title={props.name}
      //   subtitle={dateConvert(props.request.date_created.epoch)}
      //   onPress={props.onPress}
      //   rightElement={<Status status={status}></Status>}
      bottomDivider
      chevron
    ></ListItem>
  );
};

export default RequestParamListView;
