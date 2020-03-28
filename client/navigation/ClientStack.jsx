import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Clients from "../screens/Clients";
import ClientView from "../components/Client/ClientView";

const Stack = createStackNavigator();

const ClientStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Clients"
        component={Clients}
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
              name="plus-square"
              type="feather"
              onPress={() =>
                navigation.navigate("Modal", { type: "ADD_CLIENT" })
              }
            />
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerRightContainerStyle: { paddingRight: 10 },
          title: "All Clients",
          headerStyle: { backgroundColor: "#94D500" }
        }}
      />
      <Stack.Screen
        name="ClientView"
        component={ClientView}
        options={({ route }) => ({
          title: route.params.client.name,
          headerRight: () => (
            <Icon
              size={30}
              name="edit"
              type="feather"
              onPress={() => alert("Edit Client")}
            />
          ),
          headerRightContainerStyle: { paddingRight: 10 }
        })}
      />
    </Stack.Navigator>
  );
};

export default ClientStack;
