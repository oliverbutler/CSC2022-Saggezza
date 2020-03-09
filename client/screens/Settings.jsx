import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, SectionList, Text, StyleSheet } from "react-native";
import AppContext from "../context/AppContext";
import "../secrets.js";
import { ListItem } from "react-native-elements";
import { Icon } from "react-native-elements";
import { Switch } from "react-native-gesture-handler";
import { Alert } from "react-native";

const Settings = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const navigation = useNavigation();

  var SETTINGS = [
    {
      title: "App",
      data: [
        <ListItem
          title="Dark Mode"
          leftIcon={<Icon name={"moon"} type="feather" />}
          switch={<Switch />}
        />,
        <ListItem
          title="Biometrics"
          leftIcon={<Icon name={"ios-finger-print"} type="ionicon" />}
          switch={<Switch />}
        />,
        <ListItem
          title="Notifications"
          leftIcon={<Icon name={"bell"} type="feather" />}
          chevron
        />
      ]
    },
    {
      title: "Profile",
      data: [
        <ListItem
          title="My Account"
          leftIcon={<Icon name={"user"} type="feather" />}
          onPress={() =>
            navigation.navigate("UserView", {
              myself: true
            })
          }
          chevron
        />,
        <ListItem
          title="Data Protection"
          leftIcon={<Icon name={"shield"} type="feather" />}
          chevron
        />,
        <ListItem
          title="Sign Out"
          leftIcon={<Icon name={"log-out"} type="feather" />}
          onPress={() => {
            Alert.alert("Sign Out", "Are you sure?", [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () => dispatch({ type: "SIGN_OUT" }) }
            ]);
          }}
          chevron
        />
      ]
    },
    {
      title: "Help",
      data: [
        <ListItem
          title="Contact"
          leftIcon={<Icon name={"phone"} type="feather" />}
          chevron
        />,
        <ListItem
          title="Documentation"
          leftIcon={<Icon name={"help-circle"} type="feather" />}
          chevron
        />
      ]
    }
  ];

  if (state.user.role == "admin") {
    SETTINGS.push({
      title: "Request Settings",
      data: [
        <ListItem
          title="Edit Categories"
          leftIcon={<Icon name={"list"} type="feather" />}
          onPress={() => navigation.navigate("Category")}
          chevron
        />,
        <ListItem
          title="Approval Time"
          leftIcon={<Icon name={"clock"} type="feather" />}
          chevron
        />,
        <ListItem
          title="Download Report (CSV)"
          leftIcon={<Icon name={"database"} type="feather" />}
          chevron
        />
      ]
    });
  }

  return (
    <SafeAreaView>
      <SectionList
        style={{ height: "100%" }}
        sections={SETTINGS}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => item}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    padding: 10
  }
});

export default Settings;
