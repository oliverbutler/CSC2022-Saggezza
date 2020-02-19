import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Drawer from "../components/Drawer";
import { SafeAreaView } from "react-native";

// Routes
import HomeStack from "./Admin/HomeStack";
import RequestStack from "./Admin/RequestStack";
import UserStack from "./Admin/UserStack";

//Test Purpose to be moved into Manager and Employee when navigationsorted
import NewRequestStack from "./Admin/NewRequestStack";

const DrawerNav = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <DrawerNav.Navigator
      drawerContent={Drawer}
      drawerContentOptions={{
        activeTintColor: "black"
      }}
    >
      <DrawerNav.Screen name="Home" component={HomeStack} />
      <DrawerNav.Screen name="Requests" component={RequestStack} />
      <DrawerNav.Screen name="Users" component={UserStack} />
      <DrawerNav.Screen name="New Request" component={NewRequestStack} />
    </DrawerNav.Navigator>
  );
}

export default DrawerNavigator;
