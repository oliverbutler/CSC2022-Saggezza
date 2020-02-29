import React, { Component } from "react";
import {
  RefreshControl,
  ScrollView,
  SafeAreaView,
  FlatList,
  Text
} from "react-native";

import { Divider, ListItem } from "react-native-elements";

// Custom Component Imports
import Label from "../Label";
import AppContext from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { axios } from "../../helpers/Axios";

// Config Imports
import "../../secrets.js";

const dateConvert = date => {
  var newDate = new Date(date);
  return newDate.toLocaleString();
};

const RequestView = props => {
  const { state, dispatch } = React.useContext(AppContext);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);

  const request = props.route.params.request;

  const requestRefresh = () => {
    setRefreshing(true);
    axios().then(instance => {
      instance
        .get("/request/" + request.id)
        .then(res => {
          dispatch({ type: "SET_REQUEST", payload: res.data.request });
          setRefreshing(false);
        })
        .catch(err => console.log(err));
    });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={requestRefresh} />
      }
    >
      <Label label="Name">{request.name}</Label>

      <Label label="Date Created">
        {dateConvert(request.date_created.epoch)}
      </Label>

      <Divider />

      {/* <Label label="Amount">£{request.request_parameter_list[0].amount}</Label>
      <Label label="Date Expense">
        {dateConvert(request.request_parameter_list[0].date_expense.epoch)}
      </Label>
      <Label label="Billable">
        {request.request_parameter_list[0].billable_client.toString()}
      </Label>
      <Label label="Payment Method">
        {request.request_parameter_list[0].payment_method}
      </Label>
      <Label label="Description">
        {request.request_parameter_list[0].description}
      </Label> */}
    </ScrollView>
  );
};

export default RequestView;
