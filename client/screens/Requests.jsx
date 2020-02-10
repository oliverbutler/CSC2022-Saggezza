import React, { Component } from "react";
import axios from "axios";

//Libary Imports
import { StyleSheet, Text, View, Image } from "react-native";
import { Icon, Button, Container, Header, Content, Left } from "native-base";

//Custom Component Imports
import CustomHeader from "../components/CustomHeader";
import UserPreview from "../components/UserPreview";

class Requests extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/user`).then(res => {
      const users = res.data.users;
      this.setState({ users });
    });
  }

  render() {
    const { navigate } = this.props;
    return (
      <Container>
        <CustomHeader
          title="Requests"
          navigation={this.props.navigation}
        ></CustomHeader>

        <Content>
          {this.state.users.map((item, key) => (
            <UserPreview key={key} user={item} />
          ))}
        </Content>
      </Container>
    );
  }
}
export default Requests;
