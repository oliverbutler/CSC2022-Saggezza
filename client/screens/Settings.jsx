import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import Header from "../components/Header";

class Settings extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity onPress={this.props.navigation.openDrawer}>
            <Text>Open Drawer</Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", marginTop: 20 }}>Settings</Text>
        </View>
      </React.Fragment>
    );
  }
}

export default Settings;
