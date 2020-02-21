import React, { Component } from "react";
import { Animated, View, Text } from "react-native";
import { ListItem, Avatar, withBadge, Icon } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Role from "./Role";

import "../../secrets";
import { RectButton } from "react-native-gesture-handler";

const getProfile = user => {
  if (user.profile_picture != "") {
    return "http://" + ip + ":5000/static" + user.profile_picture;
  } else return "none";
};

export class UserListView extends Component {
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 200, 2001],
      outputRange: [-20, 0, 0, 1]
    });
    return (
      <RectButton onPress={this.close}>
        <Animated.View
          style={[
            {
              width: 100,
              height: "100%",
              justifyContent: "center",
              backgroundColor: "#217eff",
              transform: [{ translateX: trans }]
            }
          ]}
        >
          <Icon name="ios-create" type="ionicon" size={40} color="white" />
          <Text style={{ alignSelf: "center", fontSize: 20, color: "white" }}>
            Edit
          </Text>
        </Animated.View>
      </RectButton>
    );
  };

  render() {
    const BadgedAvatar = withBadge(
      this.props.user.request_list ? this.props.user.request_list.length : null,
      {
        right: -6,
        status: "warning",
        hidden: this.props.user.request_list ? false : true
      }
    )(Avatar);

    return (
      <Swipeable
        renderLeftActions={this.renderLeftActions}
        onSwipeableLeftOpen={() =>
          alert("open left " + this.props.user.first_name)
        }
      >
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
      </Swipeable>
    );
  }
}

export default UserListView;
