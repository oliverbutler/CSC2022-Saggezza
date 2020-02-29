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

const Category = () => {
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(AppContext);

  const [category, setCategory] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    categoryRefresh();
  }, []);

  const categoryRefresh = () => {
    SecureStore.getItemAsync("token").then(token => {
      setRefreshing(true);
      const instance = axios.create({
        baseURL: `http://${ip}:5000/`,
        timeout: 1000,
        headers: { Authorization: "Bearer " + token }
      });
      instance
        .get("/category") //change to category 
        .then(res => {
          setCategory(res.data.category);
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
          placeholder="Search Category..."
          onChangeText={setSearch}
          value={search}
        />
        <FlatList
          data={category}
          renderItem={({ item }) => (
            <CategoryPreview
              onPress={() => navigation.navigate("CategoryView", { category: item })}
              category={item}
            />
          )}
          keyExtractor={item => item._id.$oid}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={categoryRefresh} />
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default Category;
