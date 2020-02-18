import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";

import { Divider } from "react-native-elements";

import axios from "axios";

import { useNavigation } from "@react-navigation/native";

// Custom Component Imports
import Label from "../Label";

// Config Imports
import "../../secrets.js";

const dateConvert = date => {
  var newDate = new Date(date * 1000);
  return newDate.toLocaleString();
};

const RequestView = props => {
  const dateCreated = dateConvert(
    props.route.params.request.date_created.$date
  );
  const dateExpense = dateConvert(
    props.route.params.request.request_parameter_list[0].date_expense.$date
  );
  return (
    <View>
      <Label label="Name">{props.route.params.request.name}</Label>

      <Label label="Date Created">{dateCreated}</Label>
      <Divider style={{ backgroundColor: "blue" }} />
      <Label label="Amount">
        {props.route.params.request.request_parameter_list[0].amount}
      </Label>
      <Label label="Date Expense">{dateExpense}</Label>
      <Label label="Billable">
        {props.route.params.request.request_parameter_list[0].billable_client.toString()}
      </Label>
      <Label label="Payment Method">
        {props.route.params.request.request_parameter_list[0].payment_method}
      </Label>
      <Label label="Description">
        {props.route.params.request.request_parameter_list[0].description}
      </Label>
    </View>
  );
};

export default RequestView;
