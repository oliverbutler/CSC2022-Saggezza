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
import * as SecureStore from "expo-secure-store";

const RequestNew = ({ navigation }) => {
  const [modelVisible, setModalVisible] = React.useState(true);
  const [date, setDate] = React.useState();
  const [name, setName] = React.useState("");

  const Post = () => {
    SecureStore.getItemAsync("token").then(token => {
      const instance = axios.create({
        baseURL: `http://${ip}:5000/`,
        timeout: 1000,
        headers: { Authorization: "Bearer " + token }
      });
      instance.post("/request", {
        name: { name },
        employee: "5e4e7cc40b010e51251a91f7"
      });

      //.catch(err => console.log(err));
    });
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Modal animationType="slide" transparent={false} visible={modelVisible}>
        <View style={{ marginTop: 22 }}>
          <View>
            <Input
              label="Name of Request"
              //leftIcon=""
              placeholder="Enter name of request"
              errorStyle={{ color: "red" }}
              errorMessage="Some Validation Function"
              onChangeText={text => setName(text)}
              value={name}
            />

            <Label label="Date"></Label>
            <DatePicker
              style={{ width: 200 }}
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
          </View>
          <Button title="Submit" onPress={() => Post()} />
        </View>

        <Button title="Hide" onPress={() => navigation.goBack()} />
      </Modal>
    </SafeAreaView>
  );
};

//onChangeText={someFunction}
export default RequestNew;
