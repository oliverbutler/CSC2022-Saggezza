import React, { useEffect } from "react";
import axios from "axios";
import {
  SafeAreaView,
  Text,
  Modal,
  View,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import AppContext from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { TouchableOpacity } from "react-native-gesture-handler";

const RequestAddParams = props => {
  console.log(props);
  const [modelVisible, setModalVisible] = React.useState(true);
  const [date, setDate] = React.useState();
  const [name, setName] = React.useState("");
  const { state, dispatch } = React.useContext(AppContext);
  const [amount, setAmount] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const [category, setCategory] = React.useState("LOl");
  const [image, setImage] = React.useState();
  const [closing, setClosing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
  });

  //Doesnt work atm
  const dateConvert = date => {
    var newDate = new Date(date);
    return newDate.toLocaleString();
  };

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Modal animationType="slide" transparent={false} visible={modelVisible}>
      <SafeAreaView>
        <View style={{ flexDirection: "row", paddingBottom: 15 }}>
          <View style={{ flex: 1 }}></View>
          <Text
            h2
            h2Style={{
              flex: 5,
              textAlign: "center"
            }}
          >
            Add Details to Draft
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setClosing(true);
                props.navigation.goBack();
              }}
            >
              {closing ? (
                <ActivityIndicator></ActivityIndicator>
              ) : (
                <Icon name="x-square" type="feather" size={30} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Input
          label="Name of Request"
          editable={false}
          value={props.route.params.request.name.replace(/\"/g, "")}
          containerStyle={{ paddingBottom: 20 }}
        />

        <Input
          label="Date of Submission"
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
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20
          }}
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

        {loading ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <Button
            style={{
              flexDirection: "row",
              justifyContent: "center"
            }}
            title="Submit"
            onPress={() => Post()}
          />
        )}
      </SafeAreaView>
    </Modal>
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
