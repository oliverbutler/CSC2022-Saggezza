import React from "react";
import axios from "axios";
import {
  SafeAreaView,
  Text,
  Modal,
  Alert,
  ShadowPropTypesIOS
} from "react-native";
import { Button, Input } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import AppContext from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";

const RequestAddParams = props => {
  console.log(props);
  const [modelVisible, setModalVisible] = React.useState(true);
  const [date, setDate] = React.useState();
  const [name, setName] = React.useState("");
  const { state, dispatch } = React.useContext(AppContext);
  const [amount, setAmount] = React.useState(0);
  const [status, setStatus] = React.useState("");

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
          Add Details to Draft
        </Text>

        <Text>{props.route.params.request.name}</Text>
        <Text>{props.route.params.request.date_created.date}</Text>

        <Button title="Submit" onPress={() => Post()} />

        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </Modal>
    </SafeAreaView>
  );
};

//onChangeText={someFunction}
export default RequestAddParams;
