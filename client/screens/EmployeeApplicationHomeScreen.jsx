import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Container, Content } from "native-base";
import { SearchBar } from "react-native-elements";

//Import Custom Header to use on screen
import Header from "../components/Header";

class EmployeeApplicationHomeScreen extends Component {
  //Drawer Icon image
  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require("../assets/home.png")}
        style={{ height: 24, width: 24 }}
      ></Image>
    )
  };

  state = {
    search: ""
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { navigate } = this.props;
    const { search } = this.state;

    return (
      <Container style={{ backgroundColor: "#707070" }}>
        <Header
          title="Your Applications"
          navigation={this.props.navigation}
        ></Header>

        <Content>
          <SearchBar
            placeholder="Search for an application..."
            onChangeText={this.updateSearch}
            value={search}
          />
        </Content>
      </Container>
    );
  }
}

export default EmployeeApplicationHomeScreen;
