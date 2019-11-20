import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './routes/Home'
import Settings from './routes/Settings'

const routeConfig = {
  Home: { screen: Home },
  Settings: { screen: Settings },
}

const routeStyle = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2F2F2F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
}

const TabNavigator = createStackNavigator(routeConfig, routeStyle);
export default createAppContainer(TabNavigator);