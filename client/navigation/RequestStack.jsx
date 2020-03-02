import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Requests from "../screens/Admin/Requests";
import RequestView from "../components/Request/RequestView";

// Context
import AppContext from "../context/AppContext";

const Stack = createStackNavigator();

const RequestStack = () => {
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(AppContext);
  titleA = "";
  if ((state.user.role = "admin")) {
    titleA = "All Requests";
  } else if ((state.user.role = "manager")) {
    titleA = "Your Employees Requests";
  } else if ((state.user.role = "employee")) {
    titleA = "Your Requests";
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Requests"
        component={Requests}
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
        name="RequestView"
        component={RequestView}
        options={({ route }) => ({
          title: route.params.request.name,
          headerRight: () => (
            <Icon
              size={30}
              name="edit"
              type="feather"
              onPress={() => alert("Edit Request")}
            />
          ),
          headerRightContainerStyle: { paddingRight: 10 }
        })}
      />
    </Stack.Navigator>
  );
};

export default RequestStack;
