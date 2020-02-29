import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Icon } from "react-native-elements";

const HomeLabel = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={props.onPress}>
        <Icon
          name={props.icon}
          type="feather"
          iconStyle={styles.icon}
          size={45}
          color="white"
        ></Icon>
      </TouchableOpacity>

      <View style={styles.right}>
        <Text style={styles.number}>
          {props.number ? (
            props.number
          ) : (
            <ActivityIndicator></ActivityIndicator>
          )}
        </Text>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  iconContainer: {
    backgroundColor: "#888888",
    padding: 10,
    borderRadius: 10
  },
  right: {
    paddingLeft: 10
  },
  number: {
    fontSize: 35,
    height: 35
  },
  text: {
    fontSize: 20
  }
});

export default HomeLabel;
