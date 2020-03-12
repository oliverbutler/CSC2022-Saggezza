import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { Input } from "react-native-elements";
import { axios } from "../../helpers/Axios";
import AppContext from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";

const UserEdit = ({ id, myself }) => {
  const { state, dispatch } = React.useContext(AppContext);

  var user = {};
  if (myself) user = state.user;
  else user = state.users.find(user => user.id == id);
  const [currentUser, setCurrentUser] = useState(user);
  const navigation = useNavigation();

  const handleSubmit = () => {
    axios().then(instance => {
      var data = {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email
      };
      if (user.role == "admin" && data.role != currentUser.role)
        data.role = currentUser.role;

      instance.put("/user/" + user.id, data).then(res => {
        console.log(res.data);
        dispatch({ type: "SET_USER", payload: res.data.user });
        if (user.id == state.user.id)
          dispatch({ type: "RESTORE_TOKEN", user: res.data.user });
        navigation.goBack();
      });
    });
  };

  return (
    <View>
      <Input
        label="First Name"
        placeholder="Enter first name"
        errorStyle={{ color: "red" }}
        onChangeText={text =>
          setCurrentUser({ ...currentUser, first_name: text })
        }
        value={currentUser.first_name}
        containerStyle={{ paddingBottom: 20 }}
      />
      <Input
        label="Last Name"
        placeholder="Enter last name"
        errorStyle={{ color: "red" }}
        onChangeText={text =>
          setCurrentUser({ ...currentUser, last_name: text })
        }
        value={currentUser.last_name}
        containerStyle={{ paddingBottom: 20 }}
      />
      <Input
        label="Email"
        placeholder="Enter Email"
        errorStyle={{ color: "red" }}
        onChangeText={text => setCurrentUser({ ...currentUser, email: text })}
        value={currentUser.email}
        containerStyle={{ paddingBottom: 20 }}
      />
      {/* {user.role == "admin" ? (
        <Input label="Role" value={currentUser.role} />
      ) : null} */}
      <Button title="Update User" onPress={handleSubmit} />
    </View>
  );
};

export default UserEdit;
