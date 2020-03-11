import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { Input } from "react-native-elements";
import { axios } from "../../helpers/Axios";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../../context/AppContext";

const CategoryNew = () => {
  const navigation = useNavigation();
  const [name, setName] = React.useState("");
  const { state, dispatch } = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);

  const postCategory = () => {
    axios().then(instance => {
      instance
        .post("/category", { name: name }) //everyone
        .then(res => {
          axios().then(postInstance => {
            postInstance.get("/category").then(res => {
              dispatch({
                type: "SET_CATEGORIES",
                payload: res.data.categories
              });
              navigation.goBack();
            });
          });
        })
        .catch(err => console.log(err));
    });
  };

  return (
    <View style={{ height: "100%" }}>
      <Input
        label="Name of Category"
        //leftIcon=""
        placeholder="Enter name of category"
        errorStyle={{ color: "red" }}
        //="Some Validation Function"
        onChangeText={text => setName(text)}
        value={name}
        containerStyle={{ paddingBottom: 20 }}
      />
      {loading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <Button
          title="Add Category"
          onPress={() => {
            postCategory();
            setLoading(true);
          }}
        />
      )}
    </View>
  );
};

export default CategoryNew;
