import React, { Component } from "react";
import axios from "axios";
import { RefreshControl, SafeAreaView, View, Text, Image } from "react-native";

//Import Custom Header to use on screen
import { FlatList } from "react-native-gesture-handler";
import RequestListView from "../../components/Request/RequestListView";
class EmployeeApplicationHomeScreen extends Component {
  state = {
    requests: [],
    refreshing: true
  };

  componentDidMount() {
    this.userRefresh();
  }

  userRefresh() {
    this.setState({ refreshing: true });
    axios.get(`http://` + ip + `:5000/request`).then(res => {
      const requests = res.data.requests;
      this.setState({ requests });
      this.setState({ refreshing: false });
    });
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { navigate } = this.props;

    return (
      <SafeAreaView style={{ height: "100%" }}>
        <FlatList
          data={this.state.requests}
          renderItem={({ item }) => (
            <RequestListView onPress={() => alert("WIP")} request={item} />
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
    );
  }
}

export default EmployeeApplicationHomeScreen;
