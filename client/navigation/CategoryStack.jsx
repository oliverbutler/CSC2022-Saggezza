import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Categories from "../screens/Categories";
import UserView from "../components/User/UserView";

const Stack = createStackNavigator();

function CategoryStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={Categories}
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
          title: "Category List"
        }}
      />
      <Stack.Screen
        name="CategoryView"
        component={UserView}
        options={({ route }) => ({
          title: route.params.category.name
        })}
      />
    </Stack.Navigator>
  );
}

export default CategoryStack;
