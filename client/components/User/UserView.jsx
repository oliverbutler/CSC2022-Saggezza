// Libary Imports
import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { Image } from "react-native-elements";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

// Custom Component Imports
import Role from "./Role";
import Label from "../Label";

// Config Imports
import "../../secrets.js";

class UserView extends Component {
  state = {
    requests: [],
    user: this.props.route.params.user
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
      <SafeAreaView>
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
              marginTop: 15
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
      </SafeAreaView>
    );
  }
}
export default UserView;
