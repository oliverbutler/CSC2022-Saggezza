import React, { Component } from "react";
import axios from "axios";

//Libary Imports
import { StyleSheet, Text, View, Image } from "react-native";
import { Icon, Button, Container, Content, Left } from "native-base";

//Custom Component Imports
import Header from "../components/Header";

class Requests extends Component {
  render() {
    const { navigate } = this.props;
    return (
      <Container>
        <Header
          title="All Requests"
          leftFunction={this.props.navigation.goBack}
          leftIcon="ios-arrow-dropleft"
        />
        <Content>
          <Text>Request Page</Text>
        </Content>
      </Container>
    );
  }
}
export default Requests;
