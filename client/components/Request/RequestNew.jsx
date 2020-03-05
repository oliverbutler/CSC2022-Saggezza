import React from "react";
import axios from "axios";
import { SafeAreaView, Text, Modal, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import AppContext from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";

const RequestNew = ({ navigation }) => {
  const [modelVisible, setModalVisible] = React.useState(true);
  const [name, setName] = React.useState("");
  const { state, dispatch } = React.useContext(AppContext);
  const [status, setStatus] = React.useState("");

  const Post = () => {
    SecureStore.getItemAsync("token").then(token => {
      const instance = axios.create({
        baseURL: "http://" + ip + ":5000/",
        timeout: 1000,
        headers: { Authorization: "Bearer " + token }
      });
      instance
        .post("/request", {
          name: name,
          employee: state.user.id
        })
        .then(res => {
          if (res.status == 200) {
            Alert.alert(
              "Success",
              "Please add Addtional Info",
              [
                {
                  text: "OK",

                  onPress: () => navigation.goBack()
                }
              ],
              { cancelable: false }
            );
          }
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

        <Button title="Submit Draft" onPress={() => Post()} />

        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </Modal>
    </SafeAreaView>
  );
};

//onChangeText={someFunction}
export default RequestNew;
