import React, { Component } from "react";
import axios from "axios";

//Libary Imports
import { StyleSheet, Text, View, Image } from "react-native";
import { Icon, Button, Container, Header, Content, Left } from "native-base";

//Custom Component Imports
import CustomHeader from "../components/CustomHeader";

class Requests extends Component {
  render() {
    const { navigate } = this.props;
    return (
      <Container>
        <CustomHeader
          title="Requests"
          navigation={this.props.navigation}
        ></CustomHeader>

        <Content>
          <Text>Request Page</Text>
        </Content>
      </Container>
    );
  }
}
export default Requests;
