import React, { useEffect } from "react";
import axios from "axios";
import {
  SafeAreaView,
  Text,
  Modal,
  Alert,
  ShadowPropTypesIOS,
  Picker,
  View,
  StyleSheet,
  Image
} from "react-native";
import { Button, Input } from "react-native-elements";
import AppContext from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const RequestAddParams = props => {
  console.log(props);
  const [modelVisible, setModalVisible] = React.useState(true);
  const [date, setDate] = React.useState();
  const [name, setName] = React.useState("");
  const { state, dispatch } = React.useContext(AppContext);
  const [amount, setAmount] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const [category, setCategory] = React.useState("LOl");
  const [image, setImage] = React.useState(null);

  // let { image } = this.state;

  var data = [["Food", "Fuel", "Accomodation", "Drugs"]];

  const Post = () => {
    SecureStore.getItemAsync("token").then(token => {
      const instance = axios.create({
        baseURL: "http://" + ip + ":5000/",
        timeout: 1000,
        headers: { Authorization: "Bearer " + token }
      });
      instance
        .post("/request" + props.route.params.request.id + "/request/" + {}, {
          catergory: JSON.stringify(category)
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

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
    console.log("hi");
  });

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
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

        <Text>{props.route.params.request.id}</Text>

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

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            title="Pick an image from camera roll"
            onPress={() => _pickImage()}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>

        <Button title="Submit" onPress={() => Post()} />

        <Button title="Cancel" onPress={() => props.navigation.goBack()} />
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
