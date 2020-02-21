import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Drawer from "../../components/Drawer";

// Routes
import HomeStack from "./HomeStack";
import RequestStack from "./RequestStack";
import UserStack from "./UserStack";
import ClientStack from "./ClientStack";

const DrawerNav = createDrawerNavigator();

const AdminDrawer = () => {
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
    </DrawerNav.Navigator>
  );
};

export default AdminDrawer;
