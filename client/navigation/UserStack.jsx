import React, { Component } from "react";
import { createStackNavigator } from "react-navigation-stack";
import Users from "../screens/Users";
import UserDisplay from "../screens/UserDisplay";

import { Icon, Button, Container, Header, Content, Left } from "native-base";

const screens = {
  Users: {
    screen: Users
  },
  UserDisplay: {
    screen: UserDisplay
  }
};

const UserStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColour: "black"
  },
  headerMode: "none"
});

export default UserStack;
