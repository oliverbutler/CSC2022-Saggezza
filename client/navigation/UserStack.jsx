import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Users from "../screens/Users";
import UserView from "../components/User/UserView";

// Context
import AppContext from "../context/AppContext";

const Stack = createStackNavigator();

const UserStack = () => {
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(AppContext);
  titleA = "";
  if (state.user.role == "admin") {
    titleA = "All Users";
  } else if (state.user.role == "manager") {
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
          title: titleA,
          headerStyle: { backgroundColor: "#94D500" }
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
                  id: route.params.id
                })
              }
            />
          ),
          headerRightContainerStyle: { paddingRight: 10 },
          title: route.params.title
        })}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
