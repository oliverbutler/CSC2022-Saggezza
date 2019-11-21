import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

import Request from './views/Request';
import Home from './views/Home';
import Add from './views/Add';
import Login from './views/Login';

const TabConfig = {
  Request: {
    screen: Request,
    navigationOptions: {
      tabBarLabel: 'Request',
      tabBarIcon: ({ tintColor }) => (
        <EvilIconsIcon name="navicon" style={{fontSize: 30, color: tintColor}} />
      )
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <EvilIconsIcon name="user" style={{fontSize: 30, color: tintColor}} />
      )
    },
  },
  Add: {
    screen: Add,
    navigationOptions: {
      tabBarLabel: 'Add',
      tabBarIcon: ({ tintColor }) => (
        <EvilIconsIcon name="gear" style={{fontSize: 30, color: tintColor}} />
      )
    },
  },
}
const TabStyleConfig = {
  tabBarOptions: {
    activeTintColor: '#91D000',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: '#2F2F2F',
      borderTopColor: '#707070',
      borderTopWidth: 5,
    },
    labelStyle: {
    },
    tabStyle: {
      height: 50,
      width: 50,
    }
  },
  initialRouteName: 'Home',
}

const BottomNavigator = createBottomTabNavigator(TabConfig, TabStyleConfig);

const SwitchConfig = {
  Login: {
    screen: Login,
  },
  App: {
    screen: BottomNavigator,
  },
}

const SwitchNavigator = createSwitchNavigator(SwitchConfig);

export default createAppContainer(SwitchNavigator);
