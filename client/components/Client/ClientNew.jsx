import React from "react";
import { Modal, SafeAreaView, ActivityIndicator, View } from "react-native";
import { Button, Input, Icon, Text } from "react-native-elements";
import AppContext from "../../context/AppContext";
import { axios } from "../../helpers/Axios";
import { TouchableOpacity } from "react-native-gesture-handler";

const ClientNew = ({ navigation }) => {
  const [modelVisible, setModalVisible] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const { state, dispatch } = React.useContext(AppContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const post = () => {
    var data = {};
    data.name = name;
    if (email != "") {
      data.email = email;
    }
    axios().then(instance => {
      setLoading(true);
      instance
        .post("/client", data)
        .then(res => {
          dispatch({ type: "SET_CLIENT", payload: res.data.client });
          navigation.goBack();
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    });
  };

  const [closing, setClosing] = React.useState(false);

  return (
    <Modal animationType="slide" transparent={false} visible={modelVisible}>
      <SafeAreaView>
        <View style={{ flexDirection: "row", paddingBottom: 15 }}>
          <View style={{ flex: 1 }}></View>
          <Text
            h3
            h3Style={{
              flex: 5,
              textAlign: "center"
            }}
          >
            Create Client
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setClosing(true);
                navigation.navigate("Clients");
              }}
            >
              {closing ? (
                <ActivityIndicator></ActivityIndicator>
              ) : (
                <Icon name="x-square" type="feather" size={30} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Input
          label="Name of Client"
          //leftIcon=""
          placeholder="Enter name of Client"
          // errorStyle={{ color: "red" }}
          //="Some Validation Function"
          onChangeText={text => setName(text)}
          value={name}
          containerStyle={{ paddingBottom: 20 }}
        />
        <Input
          label="Contact Email"
          //leftIcon=""
          placeholder="Optional"
          // errorStyle={{ color: "red" }}
          //="Some Validation Function"
          onChangeText={text => setEmail(text)}
          value={email}
          containerStyle={{ paddingBottom: 20 }}
        />

        {loading ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <Button
            style={{
              flexDirection: "row",
              justifyContent: "center"
            }}
            title="Submit"
            onPress={post}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default ClientNew;
