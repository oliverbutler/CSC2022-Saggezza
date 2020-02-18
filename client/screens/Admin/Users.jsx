import React, { Component } from "react";
import axios from "axios";

// Libary Imports
import { RefreshControl, SafeAreaView, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

// Custom Component Imports
import UserPreview from "../../components/User/UserListView";

// Config Import
import "../../secrets.js";

const User = () => {
  const navigation = useNavigation();

  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    userRefresh();
  }, []);

  const userRefresh = () => {
    setRefreshing(true);
    axios.get(`http://` + ip + `:5000/user`).then(res => {
      setUsers(res.data.users);
      setRefreshing(false);
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

export default User;
