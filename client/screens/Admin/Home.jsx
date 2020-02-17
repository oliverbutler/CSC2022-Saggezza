import React, { Component, useEffect, useContext } from "react";

import { SafeAreaView, View } from "react-native";
import { Text, Button } from "react-native-elements";

import AppContext from "../../context/AppContext";

const Home = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <View style={{ alignSelf: "center" }}>
      <Text h2>Welcome {state.user}</Text>
      <Text>{JSON.stringify(state)}</Text>
      <Button
        title="Set Name"
        onPress={() => dispatch({ type: "updateUser", payload: "Jeff" })}
        buttonStyle={{ margin: 5 }}
      />
      <Button
        title="Increment Number"
        onPress={() =>
          dispatch({ type: "updateNumber", payload: state.number + 1 })
        }
        buttonStyle={{ margin: 5 }}
      />
      <Button
        title="Decrement Number"
        onPress={() =>
          dispatch({ type: "updateNumber", payload: state.number - 1 })
        }
        buttonStyle={{ margin: 5 }}
      />
    </View>
  );
};

export default Home;
