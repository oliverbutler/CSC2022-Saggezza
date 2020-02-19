import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Home from "../../screens/Admin/Home";
import Settings from "../../screens/Admin/Settings";

const Stack = createStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => (
            <Icon
              size={35}
              name="ios-menu"
              type="ionicon"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          ),
          headerRight: () => (
            <Icon
              size={35}
              name="ios-settings"
              type="ionicon"
              onPress={() => navigation.navigate("Settings")}
            />
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerRightContainerStyle: { paddingRight: 10 },
          title: "Home"
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default HomeStack;
