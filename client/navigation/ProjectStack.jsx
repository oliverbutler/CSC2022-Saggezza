import React, { Component } from "react";
import { View, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Projects from "../screens/Projects";
import ProjectView from "../components/Project/ProjectView";

const Stack = createStackNavigator();

const ProjectStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Projects"
        component={Projects}
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
                navigation.navigate("Modal", { type: "ADD_PROJECT" })
              }
            />
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerRightContainerStyle: { paddingRight: 10 },
          title: "All Projects"
        }}
      />
      <Stack.Screen
        name="ProjectView"
        component={ProjectView}
        options={({ route }) => ({
          title: route.params.project.name,
          headerRight: () => (
            <Icon
              size={30}
              name="edit"
              type="feather"
              onPress={() => alert("Edit Project")}
            />
          ),
          headerRightContainerStyle: { paddingRight: 10 }
        })}
      />
    </Stack.Navigator>
  );
};

export default ProjectStack;
