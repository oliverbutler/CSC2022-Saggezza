import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import Request from './views/Request';
import Home from './views/Home';
import Add from './views/Add';

const TabConfig = {
  Request: {
    screen: Request,
    navigationOptions: {
      tabBarLabel: 'Request',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/list.png')} style={[styles.icon, {tintColor: tintColor}]}/>
      )
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/dashboard.png')} style={[styles.icon, {tintColor: tintColor}]}/>
      )
    },
  },
  Add: {
    screen: Add,
    navigationOptions: {
      tabBarLabel: 'Add',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/add.png')} style={[styles.icon, {tintColor: tintColor}]}/>
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
      borderTopWidth: 4,
    }
  },
}

const BottomNavigator = createBottomTabNavigator(TabConfig, TabStyleConfig);

export default createAppContainer(BottomNavigator);

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  }
})