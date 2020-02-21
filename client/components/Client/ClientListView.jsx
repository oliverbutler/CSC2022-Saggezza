import React from "react";
import { ListItem, Avatar } from "react-native-elements";
import "../../secrets";

const ClientListView = props => {
  const dateConvert = date => {
    var newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <ListItem
      title={props.client.name}
      subtitle={props.client.email ? props.client.email : ""}
      leftAvatar={
        <Avatar rounded size="medium" title={props.client.name.charAt(0)} />
      }
      onPress={props.onPress}
      bottomDivider
      chevron
    ></ListItem>
  );
};

export default ClientListView;
