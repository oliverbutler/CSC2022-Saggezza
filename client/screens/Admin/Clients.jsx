import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { RefreshControl, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ClientListView from "../../components/Client/ClientListView";
import AppContext from "../../context/AppContext";
import { axios } from "../../helpers/Axios";

const Clients = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { state, dispatch } = React.useContext(AppContext);

  const clientRefresh = () => {
    setRefreshing(true);
    axios().then(instance => {
      instance
        .get("/client")
        .then(res => {
          dispatch({ type: "SET_CLIENTS", payload: res.data.clients });
          setRefreshing(false);
        })
        .catch(err => console.log(err));
    });
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <FlatList
        data={state.clients}
        renderItem={({ item }) => (
          <ClientListView
            onPress={() => navigation.navigate("ClientView", { client: item })}
            client={item}
          />
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={clientRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Clients;
