import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { RefreshControl, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ProjectListView from "../components/Project/ProjectListView";
import AppContext from "../context/AppContext";
import { axios } from "../helpers/Axios";

const Projects = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { state, dispatch } = React.useContext(AppContext);

  const projectRefresh = () => {
    setRefreshing(true);
    axios().then(instance => {
      instance
        .get("/project")
        .then(res => {
          dispatch({ type: "SET_PROJECTS", payload: res.data.projects });
          setRefreshing(false);
        })
        .catch(err => console.log(err));
    });
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <FlatList
        data={state.projects}
        renderItem={({ item }) => (
          <ProjectListView
            onPress={() =>
              navigation.navigate("ProjectView", { project: item })
            }
            project={item}
          />
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={projectRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Projects;
