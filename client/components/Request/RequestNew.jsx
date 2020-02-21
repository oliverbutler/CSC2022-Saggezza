import React, { Component, useEffect } from "react";
import axios from "axios";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Modal,
  RefreshControl,
  TextInput
} from "react-native";
import { SearchBar, ListItem, Button, Input } from "react-native-elements";
import Label from "../Label";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-datepicker";
import AppContext from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";

const RequestNew = ({ navigation }) => {
  const [modelVisible, setModalVisible] = React.useState(true);
  const [date, setDate] = React.useState();
  const [name, setName] = React.useState("");
  const { state, dispatch } = React.useContext(AppContext);

  const Post = () => {
    SecureStore.getItemAsync("token").then(token => {
      const instance = axios.create({
        baseURL: `http://10.17.5.94:5000/`,
        timeout: 1000,
        headers: { Authorization: "Bearer " + token }
      });
      instance
        .post("/request", {
          name: JSON.stringify(name),
          employee: state.user.id
        })
        .catch(err => console.log(err));
    });
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Modal animationType="slide" transparent={false} visible={modelVisible}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            paddingBottom: 20,
            paddingTop: 40
          }}
        >
          New Request Form
        </Text>

        <Input
          label="Name of Request"
          //leftIcon=""
          placeholder="Enter name of request"
          errorStyle={{ color: "red" }}
          //="Some Validation Function"
          onChangeText={text => setName(text)}
          value={name}
          containerStyle={{ paddingBottom: 20 }}
        />

        <Text style={{ paddingLeft: "2%", fontSize: 16 }}>Date</Text>
        <DatePicker
          style={{ width: "75%", paddingLeft: "5%" }}
          date={date} //initial date from state
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
          onDateChange={date => {
            setDate(date);
          }}
        />

        <Button title="Submit" onPress={() => Post()} />

        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </Modal>
    </SafeAreaView>
  );
};

//onChangeText={someFunction}
export default RequestNew;
