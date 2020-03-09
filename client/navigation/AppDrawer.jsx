import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Drawer from "../components/Drawer";

// Routes
import ClientStack from "./ClientStack";
import HomeStack from "./HomeStack";
import RequestStack from "./RequestStack";
import UserStack from "./UserStack";
import ProjectStack from "./ProjectStack";

// Context
import AppContext from "../context/AppContext";
import { Text } from "react-native";

const DrawerNav = createDrawerNavigator();

const AppDrawer = () => {
  const { state, dispatch } = React.useContext(AppContext);

  if(!state.user)
    return <Text></Text>

  if (state.user.role == "admin") {
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
        <DrawerNav.Screen name="Clients" component={ClientStack} />
        <DrawerNav.Screen name="Projects" component={ProjectStack} />
      </DrawerNav.Navigator>
    );
  }
  if (state.user.role == "manager") {
    return (
      <DrawerNav.Navigator
        drawerContent={Drawer}
        drawerContentOptions={{
          activeTintColor: "black"
        }}
      >
        <DrawerNav.Screen name="Home" component={HomeStack} />
        <DrawerNav.Screen name="Requests" component={RequestStack} />
      </DrawerNav.Navigator>
    );
  }
  if (state.user.role == "employee") {
    return (
      <DrawerNav.Navigator
        drawerContent={Drawer}
        drawerContentOptions={{
          activeTintColor: "black"
        }}
      >
        <DrawerNav.Screen name="Home" component={HomeStack} />
        <DrawerNav.Screen name="Requests" component={RequestStack} />
      </DrawerNav.Navigator>
    );
  }
};

export default AppDrawer;
