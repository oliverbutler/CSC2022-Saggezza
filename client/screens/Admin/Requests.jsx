import React, { Component } from "react";
import axios from "axios";
import { RefreshControl, SafeAreaView, View, Text, Image } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
//Import Custom Header to use on screen
import { FlatList } from "react-native-gesture-handler";
import RequestListView from "../../components/Request/RequestListView";
class AdminRequests extends Component {
  state = {
    requests: [],
    refreshing: true,
    search: ""
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
    const { search } = this.state;
    return (
      <SafeAreaView style={{ height: "100%" }}>
        <SearchBar
          placeholder="Search for an application..."
          onChangeText={this.updateSearch}
          value={search}
          lightTheme={true}
        />
        <FlatList
          data={this.state.requests}
          renderItem={({ item }) => (
            <RequestListView
              onPress={() =>
                this.props.navigation.navigate("RequestView", { request: item })
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
    );
  }
}

export default AdminRequests;
