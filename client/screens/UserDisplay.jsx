import React, { Component } from "react";
import axios from "axios";
import { Image } from "react-native-elements";
//Libary Imports
import { StyleSheet, Text, View } from "react-native";
import { Icon, Button, Container, Content, Left, Right } from "native-base";

//Custom Component Imports
import Header from "../components/Header";

import "../secrets.js";

class UserDisplay extends Component {
  render() {
    const { user } = this.props.navigation.state.params;
    return (
      <Container>
        <Header
          title={user.first_name + " " + user.last_name}
          leftFunction={this.props.navigation.goBack}
          leftIcon="ios-arrow-dropleft"
          right={
            <>
              <Button transparent>
                <Icon name="ios-trash" />
              </Button>
              <Button transparent>
                <Icon name="md-build" />
              </Button>
            </>
          }
        />
        <Content>
          <Text>
            {user.first_name} {user.last_name}
          </Text>
        </Content>
      </Container>
    );
  }
}
export default UserDisplay;
