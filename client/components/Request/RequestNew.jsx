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
  const [name, setName] = React.useState("thomas");
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
          employee: "5e4ff7305c74734a426bc4cd"
        })
        .catch(err => console.log(err));
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
