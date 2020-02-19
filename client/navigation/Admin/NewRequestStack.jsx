import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import NewRequest from "../../screens/Admin/NewRequest";

const Stack = createStackNavigator();

function NewRequestStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewRequest"
        component={NewRequest}
        options={{
          headerLeft: () => (
            <Icon
              size={35}
              name="ios-menu"
              type="ionicon"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          title: "New Request"
        }}
      />
    </Stack.Navigator>
  );
}

export default NewRequestStack;
