import React from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button, Icon } from "react-native-elements";

import RequestNew from "../components/Request/RequestNew";
import CategoryNew from "../components/Category/CategoryNew";
import ClientNew from "../components/Client/ClientNew";
import ProjectNew from "../components/Project/ProjectNew";
import UserEdit from "../components/User/UserEdit";

const Modal = ({ navigation, route }) => {
  var title = "";
  var content = <></>;

  switch (route.params.type) {
    case "ADD_REQUEST":
      title = "Add Request";
      content = <RequestNew />;
      break;
    case "ADD_CATEGORY":
      title = "Add Category";
      content = <CategoryNew />;
      break;
    case "ADD_CLIENT":
      title = "Add Client";
      content = <ClientNew />;
      break;
    case "EDIT_USER":
      title = "Edit User";
      console.log(route.params);
      if (route.params.myself) content = <UserEdit myself={true} />;
      else content = <UserEdit id={route.params.id} />;
      break;
    case "ADD_PROJECT":
      title = "Add Project";
      content = <ProjectNew />;
      break;
    default:
      break;
  }

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
          marginBottom: 20
        }}
      >
        <View style={{ flex: 1 }}></View>
        <Text
          h3
          h3Style={{
            flex: 5,
            textAlign: "center"
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "center"
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="x-square" type="feather" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ height: "100%" }}>{content}</ScrollView>
    </SafeAreaView>
  );
};

export default Modal;
