import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Clients from "../../screens/Admin/Clients";

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
          headerLeftContainerStyle: { paddingLeft: 10 },
          title: "All Clients"
        }}
      />
    </Stack.Navigator>
  );
};

export default ClientStack;
