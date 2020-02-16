// Libary Imports
import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Avatar, Text } from "react-native-elements";
import axios from "axios";

// Custom Component Imports
import Label from "../Label";

// Config Imports
import "../../secrets.js";

const getProfile = user => {
  if (user.profile_picture != "") {
    return "http://" + ip + ":5000/static" + user.profile_picture;
  } else return "none";
};

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
      <ScrollView>
        <View style={{ alignSelf: "center", paddingTop: 15, padding: 10 }}>
          <Avatar
            rounded
            size="xlarge"
            title={
              this.state.user.first_name.charAt(0) +
              this.state.user.last_name.charAt(0)
            }
            source={{
              uri: getProfile(this.state.user)
            }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text h2>
            {this.state.user.first_name + " " + this.state.user.last_name}
          </Text>
          <Text>{this.state.user.email}</Text>
        </View>
      </ScrollView>
    );
  }
}
export default UserView;
