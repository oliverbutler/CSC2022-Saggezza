import React, { Component } from "react";
import { Text, Image } from "react-native";
import { Container, Content } from "native-base";

//Import Custom Header to use on screen
import CustomHeader from "../components/CustomHeader";

class NewRequestsHomeScreen extends Component {
  //Drawer Icon image
  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require("../assets/home.png")}
        style={{ height: 24, width: 24 }}
      ></Image>
    )
  };

  render() {
    const { navigate } = this.props;

    return (
      <Container style={{ backgroundColor: "#707070" }}>
        <CustomHeader
          title="New Requests"
          navigation={this.props.navigation}
        ></CustomHeader>
        <Content>
          <Text></Text>
        </Content>
      </Container>
    );
  }
}
export default NewRequestsHomeScreen;