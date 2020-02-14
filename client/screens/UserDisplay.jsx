import React, { Component } from "react";
import axios from "axios";

//Libary Imports
import { StyleSheet, Text, View, Image } from "react-native";
import {
  Icon,
  Button,
  Container,
  Header,
  Content,
  Left,
  Right
} from "native-base";

//Custom Component Imports
import CustomHeader from "../components/CustomHeader";

import "../secrets.js";

class UserDisplay extends Component {
  render() {
    const { user } = this.props.navigation.state.params;
    return (
      <Container>
        <CustomHeader
          title={user.first_name}
          leftFunction={this.props.navigation.goBack}
          leftIcon="ios-arrow-dropleft"
        >
          <Button transparent>
            <Icon name="ios-trash" />
          </Button>
          <Button transparent>
            <Icon name="md-build" />
          </Button>
        </CustomHeader>
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
