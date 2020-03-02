import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Home from "../../screens/Admin/Home";
import Settings from "../../screens/Admin/Settings";

const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => {
    const { state, dispatch } = useContext(AppContext);
},

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
          title: switch (state.user.role) {
            case "admin": title: "Admin Home";
            case "manager": title: "Manager Home";
            default:title: "Employee Home";
            }
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default HomeStack;