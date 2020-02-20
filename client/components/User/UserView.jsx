// Libary Imports
import React, { Component } from "react";
import { View, ScrollView, Button } from "react-native";
import { Avatar, Text } from "react-native-elements";
import axios from "axios";

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
          <Text>
            {this.state.user.role}
            {"\n"}
          </Text>
          {(() => {
            switch (this.state.user.role) {
              case "manager":
                return (
                  // show list of the manager's employees, button is temporary
                  <Button
                    title="Users"
                    buttonStyle={{ margin: 5 }}
                    onPress={() => this.props.navigation.navigate("Users")}
                  ></Button>
                );
              case "employee":
                return (
                  // show list of the user's requests, button is temporary
                  <Button
                    title="Requests"
                    buttonStyle={{ margin: 5 }}
                    onPress={() => this.props.navigation.navigate("Requests")}
                  ></Button>
                );
              default:
                return null;
            }
          })()}
        </View>
      </ScrollView>
    );
  }
}
export default UserView;
