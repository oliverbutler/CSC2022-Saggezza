import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from "react-native";

const DATA = [
  {
    id: "1",
    name: "Trip to Sunderland",
    date: "12/11/2019",
    status: "pending"
  },
  {
    id: "2",
    name: "Trip to London",
    date: "09/11/2019",
    status: "approved"
  },
  {
    id: "3",
    name: "Trip to Manchester",
    date: "09/11/2019",
    status: "denied"
  },
  {
    id: "4",
    name: "Trip to Sunderland",
    date: "12/11/2019",
    status: "pending"
  },
  {
    id: "5",
    name: "Trip to London",
    date: "09/11/2019",
    status: "approved"
  },
  {
    id: "6",
    name: "Trip to Manchester",
    date: "09/11/2019",
    status: "denied"
  }
];

function onSelect(id) {
  console.log(id + " pressed");
}

function Capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function RequestItem({ data, selected }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(data.id)}
      style={[
        styles.request,
        { backgroundColor: selected ? "#333333" : "#222222" }
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={styles.text}>Name: {data.name}</Text>
          <Text style={styles.text}>Date: {data.date}</Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text
            style={[
              data.status == "approved" ? styles.green : styles.text,
              data.status == "denied" ? styles.red : ""
            ]}
          >
            {Capitalize(data.status)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default class Add extends React.Component {
  render() {
    return (
      <ImageBackground
        style={styles.backgroundGradient}
        imageStyle={styles.backgroundGradient_imageStyle}
        source={require("../../assets/images/gradient-green.png")}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Requests</Text>
          </View>
          <View style={styles.content}>
            <FlatList
              style={styles.requestList}
              data={DATA}
              renderItem={({ item }) => <RequestItem data={item} />}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50
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
  content: {
    margin: 10,
    alignItems: "stretch"
  },
  text: {
    color: "white",
    fontSize: 15
  },
  backgroundGradient: {
    left: 0,
    height: "100%",
    backgroundColor:
      "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(31,178,204,0.69)",
    position: "absolute",
    right: 0,
    top: 0
  },
  backgroundGradient_imageStyle: {
    opacity: 0.69
  },
  request: {
    padding: 15,
    margin: 2,
    borderRadius: 10
  },
  requestList: {
    height: "100%"
  },
  text: {
    color: "white"
  },
  red: {
    color: "red"
  },
  green: {
    color: "#91D000"
  }
});
