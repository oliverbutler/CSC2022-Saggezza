import React, { Component } from "react";

// Libary Imports
import { View, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

// Custom Component Import

// Config Import
import "../../secrets.js";

const Settings = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Sign Out"
        icon={
          <Icon
            name="ios-person"
            type="ionicon"
            color="white"
            iconStyle={{ paddingRight: 5 }}
          />
        }
        buttonStyle={{ width: 150 }}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default Settings;
