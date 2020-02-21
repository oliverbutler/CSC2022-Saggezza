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

const RequestListView = props => {
  const status = props.request.status;

  const dateConvert = date => {
    var newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <ListItem
      title={props.request.name}
      subtitle={dateConvert(props.request.date_created.epoch)}
      onPress={props.onPress}
      rightElement={<Status status={status}></Status>}
      bottomDivider
      chevron
    ></ListItem>
  );
};

export default RequestListView;
