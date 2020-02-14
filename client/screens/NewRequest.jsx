import React, { Component } from "react";

//Libary Imports
import { StyleSheet, Text, View, Image } from "react-native";
import { Icon, Button, Container, Header, Content, Left } from "native-base";

//Custom Component Imports
import Header from "../components/Header";

class NewRequestScreen extends Component {
  //Drawer Icon image
  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require("../assets/home.png")}
        style={{ height: 24, width: 24 }}
      ></Image>
    )
  };

  render() {
    const { navigate } = this.props;

    return (
      <Container>
        <Header title="New Request" navigation={this.props.navigation}></Header>

        <Content></Content>
      </Container>
    );
  }
}
export default NewRequestScreen;
