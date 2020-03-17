import React, { Component, useEffect, useState } from "react";

import {
  RefreshControl,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  Picker,
  View
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Input, Button, CheckBox } from "react-native-elements";
import * as SecureStore from "expo-secure-store";

// Custom Component Imports
import Label from "../Label";
import AppContext from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { axios } from "../../helpers/Axios";
//import DatePicker from "react-native-datepicker";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
//import DatePicker from "react-datepicker";
//import DatePicker from "react-date-picker";
import DatePicker from "react-native-datepicker";

import RequestParamListView from "../Request/RequestParamListView";

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
  const [paramID, setParamID] = React.useState("");

  const [expenseName, setExpenseName] = React.useState();
  const [amount, setAmount] = React.useState(0);
  const [category, setCategory] = React.useState();
  const [expenseDate, setExpenseDate] = React.useState();

  const [personalChecked, setPersonalChecked] = React.useState(true);
  const [paymentMethod, setPaymentMethod] = React.useState("");

  const [params, setParams] = React.useState();

  const [billableChecked, setBillableChecked] = React.useState(false);

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

  const userRefresh = () => {
    setRefreshing(true);
    axios().then(instance => {
      instance
        // /request/<id>/parameter
        .get("/request/" + props.route.params.request.id + "/parameter")
        .then(res => {
          // dispatch({ type: "SET_REQUESTS", payload: res.data.requests });
          console.log(res.data);
          setParams(res.data);
          setRefreshing(false);
        })
        .catch(err => console.log(err));
    });
  };

  useEffect(() => {
    console.log(props.route.params.request.id);
    axios().then(instance => {
      instance
        // /request/<id>/parameter
        .get("/request/" + props.route.params.request.id + "/parameter")
        .then(res => {
          // dispatch({ type: "SET_REQUESTS", payload: res.data.requests });
          console.log(res.data);
          //setParams(res.data.request_parameter);
          setRefreshing(false);
        })
        .catch(err => console.log("Failed Getting Params"));
    });
  }, []);

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const Post = () => {
    var images = new FormData();
    //images.set("file");
    images.append("file", image);

    console.log(images);

    if (personalChecked) {
      setPaymentMethod("own");
    } else {
      setPaymentMethod("corporate");
    }
    axios(false).then(instance => {
      instance
        .post("/request/" + props.route.params.request.id + "/parameter", {
          name: expenseName,
          amount: amount,
          category: category,
          date_expense: expenseDate.toString(),
          billable_client: billableChecked,
          payment_method: paymentMethod
        })

        .then(res => {
          instance.get(
            "/request/" + props.route.params.request.id + "/parameter"
          );
          var index = res.data.request.request_parameter_list.length;
          setParamID(res.data.request.request_parameter_list[index - 1].id);
          console.log(paramID);
        })
        .catch(err => console.log(err));
    });

    // axios(true).then(instance => {
    //   instance
    //     .post(
    //       "/request/" +
    //         props.route.params.request.id +
    //         "/parameter/" +
    //         paramID +
    //         "/file",
    //       {
    //         file: images
    //       }
    //     )
    //     .catch(err => console.log(err));
    // });
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
            style={{ width: 200 }}
            date={expenseDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2019-01-01"
            maxDate="2021-01-01"
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
              // ... You can check the source to find the other keys.
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
            onPress={() => {
              setPaymentMethod("own");
              setPersonalChecked(true);
            }}
          />
          <CheckBox
            center
            title="Corporate"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={!personalChecked}
            onPress={() => {
              setPaymentMethod("corporate");
              setPersonalChecked(false);
            }}
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
      <Text
        style={{
          textAlign: "center",
          fontSize: 23,
          paddingBottom: 20,
          paddingTop: 10
        }}
      >
        Submitted Expenses
      </Text>

      <FlatList
        data={params}
        renderItem={({ item }) => (
          <RequestParamListView
            // onPress={() =>
            //   navigation.navigate("RequestView", { request: item })
            // }
            param={item}
          />
        )}
        keyExtractor={item => item.id}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={userRefresh} />
        // }
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
