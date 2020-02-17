import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Drawer from "../navigation/DrawerNavigation";
import Login from "../screens/Login";

const Stack = createStackNavigator();

export default class AppStack extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="none" initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Drawer" component={Drawer} />
      </Stack.Navigator>
    );
  }
}
