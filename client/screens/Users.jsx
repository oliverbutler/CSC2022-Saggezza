import React, { Component } from "react";
import axios from "axios";

//Libary Imports
import { StyleSheet, Text, View, Image } from "react-native";
import { Icon, Button, Container, Content, Left } from "native-base";

//Custom Component Imports
import Header from "../components/Header";
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

  render() {
    const { search } = this.state;
    return (
      <Container>
        <Header
          title="All Users"
          leftFunction={() => this.props.navigation.openDrawer()}
          leftIcon="ios-menu"
        ></Header>
        <Content>
          <SearchBar
            placeholder="Search for an application..."
            onChangeText={this.updateSearch}
            value={search}
            lightTheme={true}
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
