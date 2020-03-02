import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Drawer from "../../components/Drawer";

// Routes
import HomeStack from "./HomeStack";
import RequestStack from "./RequestStack";
import UserStack from "./UserStack";
import CategoryStack from "./CategoryStack";
import ClientStack from "./ClientStack";

// Context
import AppContext from "../../context/AppContext";

const AllDrawer = ({ navigation }) => {
    const { state, dispatch } = useContext(AppContext);
},

const DrawerNav = createDrawerNavigator();

const AllDrawer = () => {
  return (
    <DrawerNav.Navigator
      drawerContent={Drawer}
      drawerContentOptions={{
        activeTintColor: "black"
      }}
    >
      <DrawerNav.Screen name="Home" component={HomeStack} />
      {(() => {
        switch (state.user.role) {
          case "admin":
            return (
              (<DrawerNav.Screen name="Requests" component={RequestStack} />),
              (<DrawerNav.Screen name="Users" component={UserStack} />),
              (
                <DrawerNav.Screen name="Categories" component={CategoryStack} />
              ),
              (<DrawerNav.Screen name="Clients" component={ClientStack} />)
            );
          case "manager":
            return (
              (<DrawerNav.Screen name="Employees" component={EmployeeStack} />),
              (<DrawerNav.Screen name="Requests" component={RequestStack} />)
            );
          default:
            return (
              <DrawerNav.Screen name="My Requests" component={MyRequestStack} />
            );
        }
      })()}
    </DrawerNav.Navigator>
  );
};

export default AllDrawer;
