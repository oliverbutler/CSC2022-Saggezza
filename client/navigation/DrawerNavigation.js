import { createDrawerNavigator } from "react-navigation-drawer";

import Home from "../screens/Home";
import Settings from "../screens/Settings";

const DrawerNavigator = createDrawerNavigator(
  {
    Home: Home,
    Settings: Settings
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#00aa00"
    }
  }
);

export default DrawerNavigator;
