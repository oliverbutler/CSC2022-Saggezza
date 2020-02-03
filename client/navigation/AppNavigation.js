import { createAppContainer, createSwitchNavigator } from "react-navigation";

import DrawerNavigator from "./DrawerNavigation";

export default createAppContainer(
  createSwitchNavigator({
    Main: DrawerNavigator
  })
);
