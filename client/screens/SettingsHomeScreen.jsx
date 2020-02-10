import React, {Component} from 'react';

//Libary Imports
import { StyleSheet, Text, View, Image } from 'react-native';
import {Icon, Button, Container, Header, Content, Left} from 'native-base';

//Custom Component Imports
import CustomHeader from '../components/CustomHeader';


class SettingsHomeScreen extends Component {

    //Drawer Icon image
    static navigationOptions = {drawerIcon: (
        <Image source = {require('../assets/settings.png')} style = {{height: 24, width: 24}} ></Image>
    )}

    render(){
        const {navigate} = this.props;

        return (
            <Container style = {{backgroundColor: '#707070'}}>
                <CustomHeader title = "Settings" navigation = {this.props.navigation}></CustomHeader>

                <Content >
                </Content>

            </Container>
        );
    }
}
export default SettingsHomeScreen;