import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { RefreshControl, SafeAreaView, View, Text, Image } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import * as SecureStore from "expo-secure-store";

import { useNavigation } from "@react-navigation/native";
//Import Custom Header to use on screen
import { FlatList } from "react-native-gesture-handler";
import RequestListView from "../../components/Request/RequestListView";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    userRefresh();
  }, []);

  const userRefresh = () => {
    SecureStore.getItemAsync("token").then(token => {
      setRefreshing(true);
      const instance = axios.create({
        baseURL: `http://${ip}:5000/`,
        timeout: 1000,
        headers: { Authorization: "Bearer " + token }
      });
      instance
        .get("/request")
        .then(res => {
          setRequests(res.data.requests);
          setRefreshing(false);
        })
        .catch(err => console.log(err));
    });
  };

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
        keyExtractor={item => item.id}
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
