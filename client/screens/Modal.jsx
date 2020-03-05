import React from "react";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Text, Button, Icon } from "react-native-elements";

import RequestNew from "../components/Request/RequestNew";

const Modal = ({ navigation, route }) => {
  var title = "";
  var content = <></>;

  switch (route.params.type) {
    case "ADD_REQUEST":
      title = "Add Request";
      content = <RequestNew />;
      break;
    default:
      break;
  }

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
          marginBottom: 20
        }}
      >
        <View style={{ flex: 1 }}></View>
        <Text
          h3
          h3Style={{
            flex: 5,
            textAlign: "center"
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "center"
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="x-square" type="feather" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      {content}
    </SafeAreaView>
  );
};

export default Modal;
