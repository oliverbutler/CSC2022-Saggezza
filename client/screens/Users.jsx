import React, { Component } from "react";
import axios from "axios";

//Libary Imports
import { StyleSheet, Text, View, Image } from "react-native";
import { Icon, Button, Container, Header, Content, Left } from "native-base";

//Custom Component Imports
import CustomHeader from "../components/CustomHeader";
import UserPreview from "../components/UserPreview";

import "../secrets.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";

class User extends Component {
  state = {
    users: [],
    search: ""
  };

  updateSearch = search => {
    this.setState({ search });
  };

  componentDidMount() {
    axios.get(`http://` + ip + `:5000/user`).then(res => {
      const users = res.data.users;
      this.setState({ users });
    });
  }
  leftFunction = () => {};
  render() {
    const { search } = this.state;
    return (
      <Container>
        <CustomHeader
          title="Users"
          leftFunction={this.props.navigation.openDrawer}
          leftIcon="ios-menu"
        ></CustomHeader>
        <Content>
          <SearchBar
            placeholder="Search for an application..."
            onChangeText={this.updateSearch}
            value={search}
          />
          {this.state.users.map((item, key) => (
            <UserPreview
              onPress={() =>
                this.props.navigation.navigate("UserDisplay", { user: item })
              }
              key={key}
              user={item}
            />
          ))}
        </Content>
      </Container>
    );
  }
}
export default User;
