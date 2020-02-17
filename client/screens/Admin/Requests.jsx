import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { RefreshControl, SafeAreaView, View, Text, Image } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";
//Import Custom Header to use on screen
import { FlatList } from "react-native-gesture-handler";
import RequestListView from "../../components/Request/RequestListView";

const Request = () => {
  // state = {
  //   requests: [],
  //   refreshing: true,
  //   // search: ""
  // };

  const [requests, setRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    userRefresh();
  }, []);

  const userRefresh = () => {
    setRefreshing(true);
    axios.get(`http://` + ip + `:5000/request`).then(res => {
      const requests = res.data.requests;
      setRequests(requests);
      setRefreshing(false);
    });
  };

  // updateSearch = search => {
  //   this.setState({ search });
  // };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ height: "100%" }}>
      {/* <SearchBar
        placeholder="Search for an application..."
        onChangeText={updateSearch(search)}
        value={search}
        lightTheme={true}
      /> */}
      <FlatList
        data={requests}
        renderItem={({ item }) => (
          <RequestListView
            onPress={() =>
              navigation.navigate("RequestView", { request: item })
            }
            request={item}
          />
        )}
        keyExtractor={item => item._id.$oid}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => userRefresh()}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Request;
