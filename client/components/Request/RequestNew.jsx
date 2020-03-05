import React from "react";
import { View, Text, Alert, Button } from "react-native";
import { Input } from "react-native-elements";
import AppContext from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { axios } from "../../helpers/Axios";

const RequestNew = () => {
  const [name, setName] = React.useState("");
  const { state, dispatch } = React.useContext(AppContext);

  const navigation = useNavigation();

  const Post = () => {
    axios().then(instance => {
      instance
        .post("/request", {
          name: name,
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

export default RequestNew;
