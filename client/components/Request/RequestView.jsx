import React, { Component } from "react";
import axios from "axios";
import {
  RefreshControl,
  ScrollView,
  SafeAreaView,
  FlatList,
  Text,
  Image,
  Picker,
  View
} from "react-native";

import { Input, Button, CheckBox } from "react-native-elements";
import * as SecureStore from "expo-secure-store";

// Custom Component Imports
import Label from "../Label";
import AppContext from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
//import { axios } from "../../helpers/Axios";
import DatePicker from "react-native-datepicker";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

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

  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [image, setImage] = React.useState();

  const [expenseName, setExpenseName] = React.useState();
  const [amount, setAmount] = React.useState(0);
  const [category, setCategory] = React.useState();
  const [expenseDate, setExpenseDate] = React.useState();
  const [personalChecked, setPersonalChecked] = React.useState(false);
  const [corporateChecked, setCoorprateChecked] = React.useState(false);
  const [billableChecked, setBillableChecked] = React.useState(false);
  const [payentMethod, setPaymentMethod] = React.useState("");

  const requestRefresh = () => {
    setRefreshing(true);
    axios().then(instance => {
      instance
        .get("/request/" + props.route.params.request.id)
        .then(res => {
          dispatch({ type: "SET_REQUEST", payload: res.data.request });
          setRefreshing(false);
        })
        .catch(err => console.log(err));
    });
  };

  const Post = () => {
    console.log(category);
    // if (personalChecked) {
    //   setPaymentMethod("own");
    // } else {
    //   setPaymentMethod("corporate");
    // }
    SecureStore.getItemAsync("token").then(token => {
      const instance = axios.create({
        baseURL: "http://" + ip + ":5000/",
        timeout: 1000,
        headers: { Authorization: "Bearer " + token }
      });
      instance
        .post("/request/" + props.route.params.request.id + "/parameter", {
          name: "Thomas",
          amount: 21.21,
          category: category,
          date_expense: "2020-1-15",
          billable_client: true,
          payment_method: "own"
        })

        .then(res => console.log(res.data))

        .catch(err => console.log(err));
    });
  };

  if (show == true)
    return (
      <>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={requestRefresh}
            />
          }
        >
          <Input
            label="Name of Request"
            editable={false}
            value={props.route.params.request.name.replace(/\"/g, "")}
            containerStyle={{ paddingBottom: 20 }}
          />

          <Input
            label="Date of Submission"
            editable={false}
            value={props.route.params.request.date_created.date}
            containerStyle={{ paddingBottom: 20 }}
          />
          <Button
            style={{
              flexDirection: "row",
              justifyContent: "center"
            }}
            title={"Cancel"}
            onPress={() => setShow(!show)}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 23,
              paddingBottom: 20,
              paddingTop: 10
            }}
          >
            New Expense Details
          </Text>

          <Input
            label="Name of Expense"
            //leftIcon=""
            placeholder="Enter Expense"
            errorStyle={{ color: "red" }}
            //="Some Validation Function"
            onChangeText={text => setExpenseName(text)}
            value={expenseName}
            containerStyle={{ paddingBottom: 20 }}
          />

          <Input
            label="Amount "
            //leftIcon=""
            placeholder="Enter Amount"
            errorStyle={{ color: "red" }}
            //="Some Validation Function"
            onChangeText={text => setAmount(text)}
            value={amount}
            containerStyle={{ paddingBottom: 20 }}
          />

          <Input
            label="Category"
            placeholder="Select a Category"
            value={category}
            //containerStyle={{}}
          />

          <Picker
            selectedValue={category}
            onValueChange={onValueChange => setCategory(onValueChange)}
          >
            {state.categories.map((item, index) => {
              return (
                <Picker.Item label={item.name} value={item.id} key={index} />
              );
            })}
          </Picker>
          <Text style={{ paddingLeft: "2%", fontSize: 16 }}>Expense Date</Text>
          <DatePicker
            style={{
              width: "75%",
              paddingLeft: "5%",
              paddingTop: "2%",
              paddingBottom: "4%"
            }}
            date={expenseDate} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2019"
            maxDate="01-01-2022"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={expenseDate => {
              setExpenseDate(expenseDate);
            }}
          />

          <Text style={{ paddingLeft: "2%", fontSize: 16 }}>
            Payment Method
          </Text>
          <CheckBox
            center
            title="Personal"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={personalChecked}
            onPress={() => setPersonalChecked(!personalChecked)}
          />
          <CheckBox
            center
            title="Corporate"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={corporateChecked}
            onPress={() => setCoorprateChecked(!corporateChecked)}
          />

          <Text style={{ paddingLeft: "2%", fontSize: 16, paddingTop: 20 }}>
            Billable to Client?
          </Text>
          <CheckBox
            center
            title="Yes"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={billableChecked}
            onPress={() => setBillableChecked(!billableChecked)}
          />

          <Text
            style={{
              paddingLeft: "2%",
              fontSize: 16,
              paddingTop: 20,
              paddingBottom: 20
            }}
          >
            Upload Evidence
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 20
            }}
          >
            <Button
              title="Pick an image from camera roll"
              onPress={() => _pickImage()}
              style={{ paddingBottom: 20 }}
            />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>

          {loading ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <Button
              style={{
                flexDirection: "row",
                justifyContent: "center"
              }}
              title="Submit"
              onPress={() => {
                Post();
                setShow(!show);
              }}
            />
          )}
        </ScrollView>
      </>
    );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={requestRefresh} />
      }
    >
      <Input
        label="Name of Request"
        editable={false}
        value={props.route.params.request.name.replace(/\"/g, "")}
        containerStyle={{ paddingBottom: 20 }}
      />

      <Input
        label="Date of Submission"
        editable={false}
        value={props.route.params.request.date_created.date}
        containerStyle={{ paddingBottom: 20 }}
      />

      <Button
        style={{
          flexDirection: "row",
          justifyContent: "center"
        }}
        title={"Add Expense"}
        onPress={() => setShow(!show)}
      />
    </ScrollView>
  );
};

export default RequestView;
