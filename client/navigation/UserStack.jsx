import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Users from "../screens/Admin/Users";
import UserView from "../components/User/UserView";

// Context
import AppContext from "../context/AppContext";

const Stack = createStackNavigator();

const UserStack = () => {
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(AppContext);
  titleA = "";
  if ((state.user.role = "admin")) {
    titleA = "All Users";
  } else if ((state.user.role = "manager")) {
    titleA = "Your Employees";
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Users"
        component={Users}
        options={{
          headerLeft: () => (
            <Icon
              size={30}
              name="menu"
              type="feather"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          title: titleA
        }}
      />
      <Stack.Screen
        name="UserView"
        component={UserView}
        options={({ route }) => ({
          title:
            route.params.user.first_name + " " + route.params.user.last_name
        })}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
