import React from "react";
import {
  Button,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  View
} from "react-native";
import { Input, Icon, Text } from "react-native-elements";
import AppContext from "../../context/AppContext";
import { axios } from "../../helpers/Axios";
import { useNavigation } from "@react-navigation/native";

const ProjectNew = () => {
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(AppContext);

  const [name, setName] = React.useState("");

  const post = () => {
    var data = { name: name };
    axios().then(instance => {
      instance
        .post("/project", data)
        .then(res => {
          dispatch({ type: "SET_PROJECT", payload: res.data.project });
          navigation.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  return (
    <View>
      <Input
        label="Name of Project"
        //leftIcon=""
        placeholder="Enter name of Project"
        // errorStyle={{ color: "red" }}
        //="Some Validation Function"
        onChangeText={text => setName(text)}
        value={name}
        containerStyle={{ paddingBottom: 20 }}
      />

      <Button
        style={{
          flexDirection: "row",
          justifyContent: "center"
        }}
        title="Submit"
        onPress={post}
      />
    </View>
  );
};

export default ProjectNew;
