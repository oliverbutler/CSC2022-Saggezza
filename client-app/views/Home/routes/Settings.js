import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

export default class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <EvilIconsIcon name="close" style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.logout}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    height: "100%",
    backgroundColor: "#222222"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10
  },
  headerTitle: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
  headerIcon: {
    color: "white",
    fontSize: 30
  },
  logout: {
    color: "white",
    fontSize: 20,
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden"
  },
  content: {
    margin: 10,
    alignItems: "center"
  },
  title: {
    color: "white"
  }
});
