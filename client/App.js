import Drawer from "./navigation/DrawerNavigation.jsx";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer></Drawer>
      </NavigationContainer>
    );
  }
}
