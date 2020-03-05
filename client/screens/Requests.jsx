import { useNavigation } from "@react-navigation/native";
import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView } from "react-native";
import { SearchBar } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import RequestListView from "../components/Request/RequestListView";
import AppContext from "../context/AppContext";
import { axios } from "../helpers/Axios";

const Request = () => {
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

  var fuse = new Fuse(state.requests, options);

  useEffect(() => {
    setResults(fuse.search(search));
  }, [search]);

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
      <SearchBar
        round={true}
        lightTheme={true}
        placeholder="Search Requests..."
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        data={search == "" ? state.requests : results}
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
