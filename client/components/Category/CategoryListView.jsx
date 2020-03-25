import React, { Component } from "react";
import { Animated, View, Text } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { exp } from "react-native-reanimated";

const getName = ({ category }) => {
  return category.name;
};

class CategoryListView extends Component {
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 200, 2001],
      outputRange: [-20, 0, 0, 1]
    });
    return (
      <RectButton onPress={this.close}>
        <Animated.View
          style={[
            {
              width: 100,
              height: "100%",
              justifyContent: "center",
              backgroundColor: "#217eff",
              transform: [{ translateX: trans }]
            }
          ]}
        >
          <Icon name="edit" type="feather" size={25} color="white" />
          <Text style={{ alignSelf: "center", fontSize: 15, color: "white" }}>
            Edit
          </Text>
        </Animated.View>
      </RectButton>
    );
  };

  render() {
    return (
      <Swipeable
        renderLeftActions={this.renderLeftActions}
        onSwipeableLeftOpen={() =>
          alert("open left " + this.props.category.name)
        }
      >
        <ListItem title={this.props.category.name}></ListItem>
      </Swipeable>
    );
  }
}

export default CategoryListView;
