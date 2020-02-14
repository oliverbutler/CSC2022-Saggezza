import React, { Component } from "react";
import axios from "axios";
//Libary Imports
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Icon, Button, Container, Content, Left, Right } from "native-base";
import { Image } from "react-native-elements";
import Role from "../components/Role";

//Custom Component Imports
import Header from "../components/Header";

import "../secrets.js";

class UserDisplay extends Component {
  componentDidMount() {
    axios.get(`http://` + ip + `:5000/request/`).then(res => {
      const users = res.data.users;
      this.setState({ users });
    });
  }

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
          <View style={{ alignSelf: "center" }}>
            <Image
              source={{
                uri: "http://" + ip + ":5000/static" + user.profile_picture
              }}
              style={{
                width: 150,
                height: 150,
                marginRight: 10
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>

          <Role role={user.role} />
          <Text>First Name: {user.first_name}</Text>
          <Text>Last Name: {user.last_name}</Text>
          <Text>Email: {user.email}</Text>

          {user.request_list.map((item, key) => (
            <Text style={{ padding: 10 }} key={key}>
              {item.$oid}
            </Text>
          ))}
        </Content>
      </Container>
    );
  }
}
export default UserDisplay;
