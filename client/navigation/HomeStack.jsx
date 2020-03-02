import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Home from "../screens/Admin/Home";
import Settings from "../screens/Admin/Settings";

// Context
import AppContext from "../context/AppContext";

const Stack = createStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(AppContext);
  titleA = "";
  if ((state.user.role = "admin")) {
    titleA = "Admin Home";
  } else if ((state.user.role = "manager")) {
    titleA = "Manager Home";
  } else if ((state.user.role = "employee")) {
    titleA = "Admin Home";
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => (
            <Icon
              size={30}
              name="menu"
              type="feather"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          ),
          headerRight: () => (
            <Icon
              size={30}
              name="settings"
              type="feather"
              onPress={() => navigation.navigate("Settings")}
            />
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerRightContainerStyle: { paddingRight: 10 },
          title: titleA
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default HomeStack;
