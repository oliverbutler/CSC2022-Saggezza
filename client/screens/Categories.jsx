import { useNavigation } from "@react-navigation/native";
import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, Text } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import AppContext from "../context/AppContext";
import { axios } from "../helpers/Axios";
import CategoryListView from "../components/Category/CategoryListView";

const Categories = () => {
  const { state, dispatch } = React.useContext(AppContext);

  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [results, setResults] = useState([]);

  var options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name"]
  };

  var fuse = new Fuse(state.categories, options);

  useEffect(() => {
    setResults(fuse.search(search));
  }, [search]);

  const userRefresh = () => {
    setRefreshing(true);
    axios().then(instance => {
      instance
        .get("/category")
        .then(res => {
          dispatch({ type: "SET_CATEGORIES", payload: res.data.categories });
          setRefreshing(false);
        })
        .catch(err => console.log(err));
    });
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <SearchBar
        round={true}
        lightTheme={true}
        placeholder="Search Categories..."
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        data={search == "" ? state.categories : results}
        renderItem={({ item }) => (
          <CategoryListView category={item}></CategoryListView>
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={userRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Categories;
