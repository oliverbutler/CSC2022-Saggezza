import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Users from "../../screens/Admin/Users";
import UserView from "../../components/User/UserView";

const Stack = createStackNavigator();

function UserStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Users"
        component={Users}
        options={{
          headerLeft: () => (
            <Icon
              size="35"
              name="ios-menu"
              type="ionicon"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          title: "User List"
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
}

export default UserStack;
