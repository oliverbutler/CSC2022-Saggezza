import React, { Component } from "react";
import { ListItem, Avatar, withBadge } from "react-native-elements";

import Role from "./Role";

import "../../secrets";

const getProfile = user => {
  if (user.profile_picture != "") {
    return "http://" + ip + ":5000/static" + user.profile_picture;
  } else return "none";
};

export class RequestListView extends Component {
  render() {
    const BadgedAvatar = withBadge(this.props.user.request_list.length, {
      right: -6,
      status: "warning",
      hidden: !this.props.user.request_list.length > 0
    })(Avatar);

    return (
      <ListItem
        title={this.props.user.first_name + " " + this.props.user.last_name}
        subtitle={this.props.user.role}
        leftAvatar={
          <BadgedAvatar
            rounded
            size="medium"
            title={
              this.props.user.first_name.charAt(0) +
              this.props.user.last_name.charAt(0)
            }
            source={{
              uri: getProfile(this.props.user)
            }}
          />
        }
        bottomDivider
        chevron
        onPress={this.props.onPress}
      ></ListItem>
    );
  }
}

export default RequestListView;
