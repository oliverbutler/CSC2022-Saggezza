import { useNavigation } from "@react-navigation/native";
import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import AppContext from "../../context/AppContext";
import { axios } from "../../helpers/Axios";
// Config Imports
import "../../secrets.js";
// Custom Component Imports
import Label from "../Label";

const ProjectView = props => {
  const { state, dispatch } = React.useContext(AppContext);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);

  const project = props.route.params.project;

  const projectRefresh = () => {
    setRefreshing(true);
    axios().then(instance => {
      instance
        .get("/project/" + project.id)
        .then(res => {
          dispatch({ type: "SET_PROJECT", payload: res.data.project });
          setRefreshing(false);
        })
        .catch(err => console.log(err));
    });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={projectRefresh} />
      }
    >
      <Label label="Name">{project.name}</Label>
    </ScrollView>
  );
};

export default ProjectView;
