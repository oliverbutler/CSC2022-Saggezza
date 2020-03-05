import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import { BlurView } from "expo-blur";

import Requests from "../screens/Requests";
import RequestView from "../components/Request/RequestView";

// Context
import AppContext from "../context/AppContext";

const Stack = createStackNavigator();

const RequestStack = () => {
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(AppContext);
  titleA = "";
  if (state.user.role == "admin") {
    titleA = "All Requests";
  } else if (state.user.role == "manager") {
    titleA = "Your Employees Requests";
  } else if (state.user.role == "employee") {
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
          title: titleA,
          headerRight: () => {
            {
              state.user.role == "employee" ? (
                <Icon
                  size={30}
                  name="plus-square"
                  type="feather"
                  onPress={() =>
                    navigation.navigate("Modal", { type: "ADD_REQUEST" })
                  }
                />
              ) : null;
            }
          },
          headerRightContainerStyle: { paddingRight: 10 }
        }}
      />
      <Stack.Screen
        name="RequestView"
        component={RequestView}
        options={({ route }) => ({
          title: route.params.request.name
        })}
      />
    </Stack.Navigator>
  );
};

export default RequestStack;
