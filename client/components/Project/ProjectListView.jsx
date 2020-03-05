import React from "react";
import { ListItem, Avatar } from "react-native-elements";
import "../../secrets";

const ProjectListView = props => {
  const dateConvert = date => {
    var newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <ListItem
      title={props.project.name}
      leftAvatar={
        <Avatar rounded size="medium" title={props.project.name.charAt(0)} />
      }
      onPress={props.onPress}
      bottomDivider
      chevron
    ></ListItem>
  );
};

export default ProjectListView;
