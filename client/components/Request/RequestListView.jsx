import React, { Component } from "react";
import { ListItem } from "react-native-elements";

import "../../secrets";

const RequestListView = props => {
  return (
    <ListItem
      title={props.request.name}
      subtitle={props.request.status}
      onPress={props.onPress}
    ></ListItem>
  );
};

export default RequestListView;
