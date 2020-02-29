import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Drawer from "../../components/Drawer";

// Routes
import HomeStack from "./HomeStack";
import RequestStack from "./RequestStack";
import UserStack from "./UserStack";
<<<<<<< HEAD
import CategoryStack from "./CategoryStack";
=======
import ClientStack from "./ClientStack";
>>>>>>> dcaddd529bce52a30cfade27e5d63de9cfcc318b

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
<<<<<<< HEAD
      <DrawerNav.Screen name="Edit Category" component={CategoryStack} />
=======
      <DrawerNav.Screen name="Clients" component={ClientStack} />
>>>>>>> dcaddd529bce52a30cfade27e5d63de9cfcc318b
    </DrawerNav.Navigator>
  );
};

export default AdminDrawer;
