import React from "react";
import axios from "axios";
import {
  SafeAreaView,
  Text,
  Modal,
  Alert,
  ShadowPropTypesIOS,
  Picker,
  View,
  StyleSheet
} from "react-native";
import { Button, Input } from "react-native-elements";
import AppContext from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";
import RNPickerSelect from "react-native-picker-select";

const RequestAddParams = props => {
  console.log(props);
  const [modelVisible, setModalVisible] = React.useState(true);
  const [date, setDate] = React.useState();
  const [name, setName] = React.useState("");
  const { state, dispatch } = React.useContext(AppContext);
  const [amount, setAmount] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const [category, setCategory] = React.useState("LOl");

  var data = [["Food", "Fuel", "Accomodation", "Drugs"]];

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

  const categoryToArray = categories => {
    var newarray = [];
    categories.forEach(category => {
      newarray.push({ label: category.name, value: category.name });
    });
    return newarray;
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

        <Text></Text>

        <Input
          label="Name of Request"
          editable={false}
          value={props.route.params.request.name}
          containerStyle={{ paddingBottom: 20 }}
        />

        <Input
          label="Name of Request"
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
          New Details
        </Text>

        <Input
          label="Amount "
          //leftIcon=""
          placeholder="Enter amount"
          errorStyle={{ color: "red" }}
          //="Some Validation Function"
          onChangeText={text => setName(text)}
          value={name}
          containerStyle={{ paddingBottom: 20 }}
        />

        <Input
          label="Category"
          //leftIcon=""
          placeholder="Enter amount"
          errorStyle={{ color: "red" }}
          //="Some Validation Function"
          onChangeText={text => setName(text)}
          value={category}
          containerStyle={{ paddingBottom: 20 }}
        />

        <View style={{ paddingLeft: 10 }}>
          <RNPickerSelect
            onValueChange={onValueChange => setCategory(onValueChange)}
            // onValueChange={value => console.log(value)}
            items={categoryToArray(state.categories)}
            //placeholder="sdvsdv"
          />
        </View>

        <Button title="Submit" onPress={() => Post()} />

        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: "center",
    color: "red"
  }
});

//onChangeText={someFunction}
export default RequestAddParams;
