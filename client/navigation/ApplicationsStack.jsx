import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation-stack';
import EmployeeApplicationHomeScreen from '../screens/EmployeeApplicationHomeScreen';

import {Icon, Button, Container, Header, Content, Left} from 'native-base';

const screens = {
    
    ApplicationsHome: {
        screen: EmployeeApplicationHomeScreen,
        navigationOptions: ({ navigation }) => {
        return {
            headerTitle: () => <Header navigation = { navigation }/> , 
        }}
    },
    
}

const ApplicationStack = createStackNavigator(screens, {

    defaultNavigationOptions:{
        headerTintColour: 'black', 
    },
    
    headerMode: 'none',

})

export default ApplicationStack;