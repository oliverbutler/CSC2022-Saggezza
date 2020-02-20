import React, { Component } from "react";
import axios from "axios";
import { SafeAreaView, View, Text, Image, Modal } from "react-native";
import { SearchBar, ListItem, Button } from "react-native-elements";
import Label from "../Label";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-datepicker";

import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Input
} from "react-native-elements";

const RequestNew = ({ navigation }) => {
  const [modelVisible, setModalVisible] = React.useState(true);
  // const { date } = this.state;

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Modal animationType="slide" transparent={false} visible={modelVisible}>
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>Create New Request </Text>

            <Button title="Hide" onPress={() => navigation.goBack()} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

//onChangeText={someFunction}
export default RequestNew;
