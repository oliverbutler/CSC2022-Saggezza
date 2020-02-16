import PropTypes from "prop-types";
import React, { Component } from "react";

import { NavigationActions } from "react-navigation";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  SafeAreaView,
  FlatList
} from "react-native";

class Drawer extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/saggezza.png")}
        />
        <View>
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>Admin</Text>
            <Button title="Users" onPress={this.navigateToScreen("Users")} />
            <Button
              title="Requests"
              onPress={this.navigateToScreen("Requests")}
            />
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>Manager</Text>
            <Button title="Employees" />
            <Button title="Requests" />
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>Employee</Text>
            <Button title="Requests" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },

  category: {
    alignItems: "center",
    width: "100%",
    padding: 20
  },

  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },

  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    justifyContent: "flex-start"
  }
});

Drawer.propTypes = {
  navigation: PropTypes.object
};

export default Drawer;
