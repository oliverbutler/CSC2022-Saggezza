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

  const dateCreated = dateConvert(props.request.date_created.$date);

  return (
    <ListItem
      title={props.request.name}
      subtitle={dateCreated}
      onPress={props.onPress}
      rightElement={
        <Status
          style={({ display: "flex" }, { alignItems: "flex-end" })}
          status={status}
        ></Status>
      }
    ></ListItem>
  );
};

export default RequestListView;
