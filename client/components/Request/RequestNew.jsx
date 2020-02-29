import React from "react";
import axios from "axios";
import { SafeAreaView, Text, Modal, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import AppContext from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";

const RequestNew = ({ navigation }) => {
  const [modelVisible, setModalVisible] = React.useState(true);
  const [date, setDate] = React.useState();
  const [name, setName] = React.useState("");
  const { state, dispatch } = React.useContext(AppContext);
  const [amount, setAmount] = React.useState(0);
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
          name: JSON.stringify(name),
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
        <Text>{status}</Text>
        <Text style={{ paddingLeft: "2%", fontSize: 16 }}>Expense Date</Text>
        <DatePicker
          style={{
            width: "75%",
            paddingLeft: "5%",
            paddingTop: "2%",
            paddingBottom: "4%"
          }}
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

        <Button title="Submit Draft" onPress={() => Post()} />

        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </Modal>
    </SafeAreaView>
  );
};

//onChangeText={someFunction}
export default RequestNew;
