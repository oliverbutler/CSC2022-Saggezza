import React, { Component } from "react";
import axios from "axios";

// Libary Imports
import { RefreshControl, SafeAreaView, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

// Custom Component Imports
import Header from "../../components/Header";
import UserPreview from "../../components/User/UserListView";

// Config Import
import "../../secrets.js";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: "",
      refreshing: true
    };
  }

  componentDidMount() {
    this.userRefresh();
  }

  userRefresh() {
    this.setState({ refreshing: true });
    axios.get(`http://` + ip + `:5000/user`).then(res => {
      const users = res.data.users;
      this.setState({ users });
      this.setState({ refreshing: false });
    });
  }

  render() {
    return (
      <View>
        <SafeAreaView style={{ height: "100%" }}>
          <FlatList
            data={this.state.users}
            renderItem={({ item }) => (
              <UserPreview
                onPress={() =>
                  this.props.navigation.navigate("UserView", { user: item })
                }
                user={item}
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
      </View>
    );
  }
}
export default User;
