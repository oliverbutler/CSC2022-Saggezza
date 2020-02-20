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

// Config Imports
import "../../secrets.js";

const dateConvert = date => {
  var newDate = new Date(date);
  return newDate.toLocaleString();
};

const RequestView = props => {
  const request = props.route.params.request;
  const [refreshing, setRefreshing] = React.useState(false);

  const userRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={userRefresh} />
      }
    >
      <Label label="Name">{request.name}</Label>

      <Label label="Date Created">
        {dateConvert(request.date_created.$date)}
      </Label>

      <Divider />

      <Label label="Amount">£{request.request_parameter_list[0].amount}</Label>
      <Label label="Date Expense">
        {dateConvert(request.request_parameter_list[0].date_expense.$date)}
      </Label>
      <Label label="Billable">
        {request.request_parameter_list[0].billable_client.toString()}
      </Label>
      <Label label="Payment Method">
        {request.request_parameter_list[0].payment_method}
      </Label>
      <Label label="Description">
        {request.request_parameter_list[0].description}
      </Label>
    </ScrollView>
  );
};

export default RequestView;
