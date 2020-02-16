import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Icon, Button, Container, Content, Left, Right } from "native-base";
import { Image } from "react-native-elements";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";


// Custom Component Imports

import Label from "../Label";
import Header from "../Label";

// Config Imports
import "../../secrets.js";

class RequestView extends Component {
  state = {
      
    request: this.props.route.params.request
  };

  
  render() {
    // this.props.navigation.setOptions({
    //   title: this.state.user.first_name + " " + this.state.user.last_name
    // });
    return (
      <Container>
        <Content>
          

         
       <Text>{this.state.request.name}</Text>
               
        </Content>
      </Container>
    );
  }
}
export default RequestView;