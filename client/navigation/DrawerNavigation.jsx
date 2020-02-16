import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Requests from "../screens/Admin/Requests";
import UserStack from "./Admin/UserStack";

// import Drawer from "../components/Drawer";

// const screens = {
//   Users: {
//     screen: UserStack
//   },
//   Requests: {
//     screen: Requests
//   }
// };

// const config = {
//   initialRouteName: "Users",
//   contentComponent: Drawer,
//   drawerOpenRoute: "DrawerOpen",
//   drawerCloseRoute: "DrawerClose",
//   drawerToggleRoute: "DrawerToggle"
// };

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Requests" component={Requests} />
      <Drawer.Screen name="UserStack" component={UserStack} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
