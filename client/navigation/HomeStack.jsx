import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Home from "../screens/Home";
import Settings from "../screens/Settings";
import Category from "../screens/Categories";
import UserView from "../components/User/UserView";

// Context
import AppContext from "../context/AppContext";

const Stack = createStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(AppContext);
  titleA = "";
  if (state.user.role == "admin") {
    titleA = "Admin Home";
  } else if (state.user.role == "manager") {
    titleA = "Manager Home";
  } else if (state.user.role == "employee") {
    titleA = "Employee Home";
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
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          headerRight: () => (
            <Icon
              size={30}
              name="plus-square"
              type="feather"
              onPress={() =>
                navigation.navigate("Modal", { type: "ADD_CATEGORY" })
              }
            />
          ),
          headerRightContainerStyle: { paddingRight: 10 },
          title: "Edit Categories"
        }}
      />
      <Stack.Screen
        name="UserView"
        component={UserView}
        options={({ route }) => ({
          headerRight: () => (
            <Icon
              size={30}
              name="edit"
              type="feather"
              onPress={() =>
                navigation.navigate("Modal", {
                  type: "EDIT_USER",
                  myself: true
                })
              }
            />
          ),
          headerRightContainerStyle: { paddingRight: 10 },
          title: "My Account"
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
