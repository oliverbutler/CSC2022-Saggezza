import React, { Component } from "react";
import { axios } from "../helpers/Axios";

// Libary Imports
import { RefreshControl, SafeAreaView, View , Text} from "react-native";
import { SearchBar } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

// Custom Component Imports
import UserPreview from "../components/User/UserListView";
import AppContext from "../context/AppContext";

// Config Import
import "../secrets.js";

const User = () => {
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(AppContext);

  // const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const userRefresh = () => {
    setRefreshing(true);
    axios().then(instance => {
      instance
        .get("/user")
        .then(res => {
          dispatch({ type: "SET_USERS", payload: res.data.users });
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
        <Text>You are a {state.user.role}</Text>
        <FlatList
          data={state.users}
          renderItem={({ item }) => (
            <UserPreview
              onPress={() => navigation.navigate("UserView", { user: item })}
              user={item}
            />
          )}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={userRefresh} />
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default User;
