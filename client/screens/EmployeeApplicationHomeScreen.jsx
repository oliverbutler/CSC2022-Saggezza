import React, { Component } from "react";
import axios from "axios";
import { Container, Content } from "native-base";
import { SearchBar } from "react-native-elements";
import { RefreshControl, SafeAreaView, View,Text, Image } from "react-native";
//Import Custom Header to use on screen
import Header from "../components/Header";
import { FlatList } from "react-native-gesture-handler";
import ApplicationsPreview from "../components/ApplicationsPreview";
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
    search: "",
    requests: [],
    refreshing: true
  };

  componentDidMount() {
    this.userRefresh();
  }

  userRefresh() {
    this.setState({ refreshing: true });
    axios.get(`http://` + ip + `:5000/request`).then(res => {
      const requests = res.data.requests
      this.setState({ requests });
      this.setState({ refreshing: false });
    });
  }

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

      <SafeAreaView style={{ height: "100%" }}>
          <FlatList
            data={this.state.requests}
            renderItem={({ item }) => (
              <ApplicationsPreview
                onPress={() =>
                  this.props.navigation.navigate("UserDisplay", { request: item })
                }
                request={item}
              />
            )}
            keyExtractor={item => item._id.$oid}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.userRefresh()}
              />
            }
          />
        </SafeAreaView>
        </Content>
      </Container>
    );
  }
}

export default EmployeeApplicationHomeScreen;
