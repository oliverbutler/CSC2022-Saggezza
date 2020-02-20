import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import {
  RefreshControl,
  SafeAreaView,
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight
} from "react-native";
import { SearchBar, ListItem, Button } from "react-native-elements";
import * as SecureStore from "expo-secure-store";

import { useNavigation } from "@react-navigation/native";
//Import Custom Header to use on screen
import { FlatList } from "react-native-gesture-handler";
import RequestListView from "../../components/Request/RequestListView";
import AppContext from "../../context/AppContext";

const Requests = () => {
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(AppContext);
  const [requests, setRequests] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const [modelVisible, setModalVisible] = React.useState(false);

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

  return (
    <SafeAreaView style={{ height: "100%" }}>
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

      <Button title="Show" onPress={() => navigation.navigate("RequestNew")} />
    </SafeAreaView>
  );
};

export default Requests;
