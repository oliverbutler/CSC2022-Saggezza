import React from "react";
import axios from "axios";
import { View, Text, Alert, Button } from "react-native";
import { Input } from "react-native-elements";
import AppContext from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const RequestNew = () => {
  const [name, setName] = React.useState("");
  const { state, dispatch } = React.useContext(AppContext);

  const navigation = useNavigation();

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
          dispatch({ type: "SET_REQUEST", payload: res.data.request });
          navigation.navigate("RequestView", {
            request: res.data.request
          });
        })
        .catch(err => console.log(err));
    });
  };

  return (
    <View style={{ height: "100%" }}>
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
    </View>
  );
};

//onChangeText={someFunction}
export default RequestNew;
