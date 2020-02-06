import React, { Component } from "react";

import { TouchableOpacity, StyleSheet } from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

import { withNavigation } from "react-navigation";
import { DrawerActions } from "react-navigation-drawer";

class DrawerTrigger extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => {
          this.props.navigation.dispatch(DrawerActions.openDrawer());
        }}
      >
        <EvilIconsIcon name="navicon" size={40} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  trigger: {
    borderRadius: 30,
    padding: 10
  }
});

export default withNavigation(DrawerTrigger);
