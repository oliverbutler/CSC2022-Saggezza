import React, { Component, useEffect, useState } from "react";
// import axios from "axios";
import { RefreshControl, SafeAreaView, View, Text, Button } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import * as SecureStore from "expo-secure-store";

import { useNavigation } from "@react-navigation/native";
//Import Custom Header to use on screen
import { FlatList } from "react-native-gesture-handler";
import RequestListView from "../components/Request/RequestListView";

import AppContext from "../context/AppContext";

import { axios } from "../helpers/Axios";

const Request = () => {
  //const [requests, setRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { state, dispatch } = React.useContext(AppContext);

  const userRefresh = () => {
    setRefreshing(true);
    axios().then(instance => {
      instance
        .get("/request")
        .then(res => {
          dispatch({ type: "SET_REQUESTS", payload: res.data.requests });
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
        data={state.requests}
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
          <RefreshControl refreshing={refreshing} onRefresh={userRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Request;
