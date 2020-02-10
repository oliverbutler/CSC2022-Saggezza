import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation-stack';
import NewRequestsHomeScreen from '../screens/NewRequestsHomeScreen';
import {Header} from 'native-base';

const screens = {
    
    NewRequestsHome: {
        screen: NewRequestsHomeScreen,
        navigationOptions: ({ navigation }) => {
        return {
            headerTitle: () => <Header navigation = { navigation }/> , 
        }}

        
    },
}

const RequestsStack = createStackNavigator(screens, {

    defaultNavigationOptions:{
        headerTintColour: 'black',  
    },
    headerMode: 'none',
})

export default RequestsStack;