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
import RequestDynamicView from "./RequestDynamicView";

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

  const [title, setTitle] = React.useState("Add New Expense");

  const categoryToArray = categories => {
    var newarray = [];
    categories.forEach(category => {
      newarray.push({ label: category.name, value: category.name });
    });
    return newarray;
  };

  const changeButtonTitle = () => {
    if (state.show == true) {
      setTitle("Cancel Expense");
    } else {
      setTitle("Add New Expense");
    }
  };

  //Doesnt work atm
  const dateConvert = date => {
    var newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <Modal animationType="slide" transparent={false} visible={modelVisible}>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              paddingBottom: 10
              //backgroundColor: "#91D000"
            }}
          >
            <View style={{ flex: 1 }}></View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 23,
                paddingBottom: 20,
                paddingTop: 20
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
                  <Icon name="x-square" type="feather" size={40} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
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

            <Button
              style={{
                flexDirection: "row",
                justifyContent: "center"
              }}
              title={state.title}
              onPress={() => {
                dispatch({ type: "SHOW", payload: !state.show });
                dispatch({ type: "TITLE", payload: "Cancel" });
                changeButtonTitle();
              }}
            />
            {state.show ? (
              <RequestDynamicView paramID={props.route.params.request.id} />
            ) : null}
          </View>
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
