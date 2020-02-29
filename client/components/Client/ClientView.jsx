import { useNavigation } from "@react-navigation/native";
import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import AppContext from "../../context/AppContext";
import { axios } from "../../helpers/Axios";
// Config Imports
import "../../secrets.js";
// Custom Component Imports
import Label from "../Label";

const ClientView = props => {
  const { state, dispatch } = React.useContext(AppContext);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);

  const client = props.route.params.client;

  const clientRefresh = () => {
    setRefreshing(true);
    axios().then(instance => {
      instance
        .get("/client/" + client.id)
        .then(res => {
          dispatch({ type: "SET_CLIENT", payload: res.data.client });
          setRefreshing(false);
        })
        .catch(err => console.log(err));
    });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={clientRefresh} />
      }
    >
      <Label label="Name">{client.name}</Label>
    </ScrollView>
  );
};

export default ClientView;
