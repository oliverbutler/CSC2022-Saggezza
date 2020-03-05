import React from "react";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Text, Button, Icon } from "react-native-elements";

const Modal = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", paddingBottom: 15 }}>
        <View style={{ flex: 1 }}></View>
        <Text
          h3
          h3Style={{
            flex: 5,
            textAlign: "center"
          }}
        >
          Create 🍌
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
    </SafeAreaView>
  );
};

export default Modal;
