import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export class Login extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text>Login Page</Text>
        <Button
          title="Sign In"
          onPress={() => this.props.navigation.navigate("Drawer")}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Login;
