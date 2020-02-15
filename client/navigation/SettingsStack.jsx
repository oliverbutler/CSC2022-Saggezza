import React, { Component } from "react";
import { createStackNavigator } from "react-navigation-stack";
import SettingsHomeScreen from "../screens/SettingsHomeScreen";

import { Icon, Button, Container, Header, Content, Left } from "native-base";

const screens = {
  SettingsHome: {
    screen: SettingsHomeScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />
      };
    }
  }
};

const ApplicationStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColour: "black"
  },

  headerMode: "none"
});

export default ApplicationStack;
