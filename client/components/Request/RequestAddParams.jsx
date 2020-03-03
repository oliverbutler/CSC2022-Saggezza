import React, { useEffect } from "react";
import axios from "axios";
import {
  SafeAreaView,
  Text,
  Modal,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Picker,
  ScrollView
} from "react-native";
import { Button, Input, Icon, CheckBox } from "react-native-elements";
import AppContext from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";
//import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { TouchableOpacity } from "react-native-gesture-handler";
import DatePicker from "react-native-datepicker";

const RequestAddParams = props => {
  console.log(props);
  const [modelVisible, setModalVisible] = React.useState(true);

  const { state, dispatch } = React.useContext(AppContext);

  // const [status, setStatus] = React.useState("");

  const [image, setImage] = React.useState();
  const [closing, setClosing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [expenseName, setExpenseName] = React.useState();
  const [amount, setAmount] = React.useState(0);
  const [category, setCategory] = React.useState();
  const [expenseDate, setExpenseDate] = React.useState();
  const [personalChecked, setPersonalChecked] = React.useState(false);
  const [corporateChecked, setCoorprateChecked] = React.useState(false);
  const [billableChecked, setBillableChecked] = React.useState(false);
  const [payentMethod, setPaymentMethod] = React.useState("");

  const Post = () => {
    if (personalChecked) {
      setPaymentMethod("own");
    } else {
      setPaymentMethod("corporate");
    }
    SecureStore.getItemAsync("token").then(token => {
      const instance = axios.create({
        baseURL: "http://" + ip + ":5000/",
        timeout: 1000,
        headers: { Authorization: "Bearer " + token }
      });
      instance
        .post("/request/" + props.route.params.request.id + "/parameter", {
          name: expenseName,
          amount: amount,
          category: category,
          date_expense: "2020-1-15",
          billable_client: billableChecked,
          payment_method: "own"
        })

        .then(res => console.log(res.data))

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
        <ScrollView>
          <View style={{ flexDirection: "row", paddingBottom: 15 }}>
            <View style={{ flex: 1 }}></View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 23,
                paddingBottom: 20,
                paddingTop: 10
              }}
            >
              Request Application
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                style={{ paddingLeft: 30 }}
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
            Add an Expense
          </Text>

          <Input
            label="Name of Expense"
            //leftIcon=""
            placeholder="Enter Expense"
            errorStyle={{ color: "red" }}
            //="Some Validation Function"
            onChangeText={text => setExpenseName(text)}
            value={expenseName}
            containerStyle={{ paddingBottom: 20 }}
          />

          <Input
            label="Amount "
            //leftIcon=""
            placeholder="Enter Amount"
            errorStyle={{ color: "red" }}
            //="Some Validation Function"
            onChangeText={text => setAmount(text)}
            value={amount}
            containerStyle={{ paddingBottom: 20 }}
          />

          <Input
            label="Category"
            placeholder="Select a Category"
            value={category}
            //containerStyle={{}}
          />

          <Picker
            selectedValue={category}
            onValueChange={onValueChange => setCategory(onValueChange)}
          >
            {state.categories.map((item, index) => {
              return (
                <Picker.Item label={item.name} value={item.id} key={index} />
              );
            })}
          </Picker>
          <Text style={{ paddingLeft: "2%", fontSize: 16 }}>Expense Date</Text>
          <DatePicker
            style={{
              width: "75%",
              paddingLeft: "5%",
              paddingTop: "2%",
              paddingBottom: "4%"
            }}
            date={expenseDate} //initial date from state
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
            onDateChange={expenseDate => {
              setExpenseDate(expenseDate);
            }}
          />

          <Text style={{ paddingLeft: "2%", fontSize: 16 }}>
            Payment Method
          </Text>
          <CheckBox
            center
            title="Personal"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={personalChecked}
            onPress={() => setPersonalChecked(!personalChecked)}
          />
          <CheckBox
            center
            title="Corporate"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={corporateChecked}
            onPress={() => setCoorprateChecked(!corporateChecked)}
          />

          <Text style={{ paddingLeft: "2%", fontSize: 16, paddingTop: 20 }}>
            Billable to Client?
          </Text>
          <CheckBox
            center
            title="Yes"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={billableChecked}
            onPress={() => setBillableChecked(!billableChecked)}
          />

          <Text
            style={{
              paddingLeft: "2%",
              fontSize: 16,
              paddingTop: 20,
              paddingBottom: 20
            }}
          >
            Upload Evidence
          </Text>
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
              style={{ paddingBottom: 20 }}
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
        </ScrollView>
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
