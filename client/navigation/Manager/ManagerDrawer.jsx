import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Drawer from "../../components/Drawer";

// Routes
import HomeStack from "./HomeStack";
import RequestStack from "./RequestStack";
import EmployeeStack from "./EmployeeStack";

const DrawerNav = createDrawerNavigator();

const ManagerDrawer = () => {
  return (
    <DrawerNav.Navigator
      drawerContent={Drawer}
      drawerContentOptions={{
        activeTintColor: "black"
      }}
    >
      <DrawerNav.Screen name="Home" component={HomeStack} />
      <DrawerNav.Screen name="Employees" component={EmployeeStack} />
      <DrawerNav.Screen name="Requests" component={RequestStack} />
    </DrawerNav.Navigator>
  );
};

export default ManagerDrawer;
