import React from "react";
import { ListItem } from "react-native-elements";

const CategoryListView = ({ category }) => {
  return <ListItem title={category.name} bottomDivider />;
};

export default CategoryListView;
