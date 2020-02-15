import React, { Component } from "react";
import axios from "axios";
//Libary Imports
import { Alert, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Icon, Button, Container, Content, Left, Right } from "native-base";
import { Image } from "react-native-elements";
import Role from "../components/Role";
import Label from "../components/Label";

//Custom Component Imports
import Header from "../components/Header";

import "../secrets.js";

class UserDisplay extends Component {
  state = {
    requests: [],
    user: this.props.navigation.state.params.user
  };
  componentDidMount() {
    axios
      .get(`http://` + ip + `:5000/request/` + this.state.user._id.$oid)
      .then(res => {
        const requests = res.data.returned_requests;
        this.setState({ requests });
      });
  }

  _deleteHandler = () => {
    //function to make simple alert
    alert("Deleted User");
  };

  render() {
    return (
      <Container>
        <Header
          title={this.state.user.first_name + " " + this.state.user.last_name}
          leftFunction={() => this.props.navigation.goBack()}
          leftIcon="ios-arrow-dropleft"
          right={
            <>
              <Button
                transparent
                onPress={() =>
                  console.log("Delete Pressed " + this.state.user._id.$oid)
                }
              >
                <Icon name="ios-trash" />
              </Button>
              <Button transparent>
                <Icon
                  name="md-build"
                  onPress={() =>
                    console.log("Modify Pressed " + this.state.user._id.$oid)
                  }
                />
              </Button>
            </>
          }
        />
        <Content>
          <View style={{ alignSelf: "center" }}>
            <Image
              source={{
                uri:
                  "http://" +
                  ip +
                  ":5000/static" +
                  this.state.user.profile_picture
              }}
              style={{
                width: 150,
                height: 150,
                marginRight: 10
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>

          <Role role={this.state.user.role} />
          <Label label="Name">
            {this.state.user.first_name} {this.state.user.last_name}
          </Label>
          <Label label="Email">{this.state.user.email}</Label>

          {this.state.requests.map((request, key) => (
            <View
              style={{
                backgroundColor: "#f5f5f5",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
                marginTop: 10
              }}
              key={key}
            >
              <Label label="Name">{request.name}</Label>
              <Role role={request.status}></Role>
              {request.request_parameter_list.map((parameter, key) => (
                <View style={{ padding: 10 }} key={key}>
                  <Label label="Name">{parameter.name}</Label>
                  <Label label="Category">{parameter.category.$oid}</Label>
                  <Label label="Amount">{parameter.amount}</Label>
                  <Label label="Billable">
                    {parameter.billable_client ? "True" : "False"}
                  </Label>
                  <Label label="Description">
                    Description: {parameter.description}
                  </Label>
                </View>
              ))}
            </View>
          ))}
        </Content>
      </Container>
    );
  }
}
export default UserDisplay;
