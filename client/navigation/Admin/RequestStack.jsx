import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Requests from "../../screens/Admin/Requests";
import RequestView from "../../components/Request/RequestView";

const Stack = createStackNavigator();

function RequestStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Requests"
        component={Requests}
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
          title: "All Requests"
        }}
      />
      <Stack.Screen
        name="RequestView"
        component={RequestView}
        options={({ route }) => ({
          title:
            route.params.request.name
            
        })}
      />
    </Stack.Navigator>
  );
}

export default RequestStack;
