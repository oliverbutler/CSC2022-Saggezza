import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Home from "../../screens/Manager/Home";
import Employees from "../../screens/Manager/Employees";
import UserView from "../../components/User/UserView";

const Stack = createStackNavigator();

const EmployeeStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Employees"
        component={Employees}
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
          title: "Employee List"
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

export default EmployeeStack;
