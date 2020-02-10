import React from "react";
import { createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
import { createAppContainer } from 'react-navigation';
import ApplicationStack from "./ApplicationsStack";
import RequestsStack from './RequestsStack';
import SettingsStack from './SettingsStack';

import {Container, Header, Content, Body} from 'native-base';
import { StyleSheet, View, Text, Image} from "react-native";

const CustomDrawerContentComponent = (props) =>(
  <Container style = {{backgroundColor: '#91D000'}}>
      <Header style = {{height: 200 , backgroundColor: '#707070'}}>
          <Body >
              <Image style = {styles.drawerImage} source = {require('../assets/saggezza.png')} />
          </Body>
      </Header>

      <Content>
        <DrawerItems {...props} />
      </Content>
  </Container>
)

const RootDrawerNavigator = createDrawerNavigator({
    Applications:{
        screen: ApplicationStack,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation = { navigation }/> ,
            }
        }
    },
    NewRequests:{
      screen: RequestsStack,
      navigationOptions: ({ navigation }) => {
          return {
              headerTitle: () => <Header navigation = { navigation }/> ,
          }
      }
    },
    Settings:{
      screen: SettingsStack,
      navigationOptions: ({ navigation }) => {
          return {
              headerTitle: () => <Header navigation = { navigation }/> ,
          }
      }
    },

},{
    initialRouteName: 'Applications',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerBackgroundColor: '#91D000'
    
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    drawerImage:{
  
      height:150,
      width: 150,
      borderRadius: 75
    }
  
  });

export default createAppContainer(RootDrawerNavigator);