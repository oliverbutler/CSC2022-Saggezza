import React, { Component } from "react";
import axios from "axios";

// Libary Imports
import { RefreshControl, SafeAreaView, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

// Custom Component Imports
import UserPreview from "../../components/User/UserListView";
import AppContext from "../../context/AppContext";

// Config Import
import "../../secrets.js";

const Employees = () => {
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(AppContext);

  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
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
        .get("/user")
        .then(res => {
          setUsers(res.data.employees);
          setRefreshing(false);
        })
        .catch(err => console.log(err));
    });
  };

  return (
    <View>
      <SafeAreaView style={{ height: "100%" }}>
        <SearchBar
          round={true}
          lightTheme={true}
          placeholder="Search Users..."
          onChangeText={setSearch}
          value={search}
        />
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <UserPreview
              onPress={() => navigation.navigate("UserView", { user: item })}
              user={item}
            />
          )}
          keyExtractor={item => item._id.$oid}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={userRefresh} />
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default Employees;
