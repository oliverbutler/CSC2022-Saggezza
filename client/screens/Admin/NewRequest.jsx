import React, { Component } from "react";
import axios from "axios";
import { SafeAreaView, View, Text, Image } from "react-native";
import Label from "../../components/Label";

import DatePicker from "react-native-datepicker";

import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Input
} from "react-native-elements";

class NewRequest extends Component {
  state = {
    date: new Date()
  };
  render() {
    const { navigate } = this.props;

    const { date } = this.state;

    return (
      <SafeAreaView style={{ height: "100%" }}>
        <Input
          label="Name of Request"
          //leftIcon=""
          placeholder="Enter name of request"
          errorStyle={{ color: "red" }}
          errorMessage="Some Validation Function"
        />
        <Label label="Date"></Label>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2019"
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
            this.setState({ date: date });
          }}
        />
      </SafeAreaView>
    );
  }
}
//onChangeText={someFunction}
export default NewRequest;
