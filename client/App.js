import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppContext from "./context/AppContext";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import Login from "./screens/Login";
import SplashScreen from "./screens/SplashScreen";
import AdminDrawer from "./navigation/Admin/AdminDrawer";
import EmployeeDrawer from "./navigation/Employee/EmployeeDrawer";
import ManagerDrawer from "./navigation/Manager/ManagerDrawer";

const initialState = {
  user: null, // user model from server
  isLoading: true,
  isSignIn: false
};

const reducer = (prevState, action) => {
  console.log(`🟩 Action ▶ ${JSON.stringify(action)}`);
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        user: action.user,
        isLoading: false,
        isSignIn: true
      };
    case "NO_TOKEN":
      return {
        ...prevState,
        isSignIn: false,
        isLoading: false
      };
    case "SIGN_IN":
      return {
        ...prevState,
        user: action.user,
        isSignIn: true
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        user: null,
        isSignIn: false,
        loading: true
      };
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      // Try get token from SecureStore, if its there, dispatch restore token

      SecureStore.getItemAsync("token").then(token => {
        // If token is null, its not found
        if (token != null) {
          console.log(token);
          console.log("Token Found ✅");

          // Lets try verify this against the /auth route
          const instance = axios.create({
            baseURL: `http://${ip}:5000/`,
            headers: { Authorization: "Bearer " + token }
          });
          instance
            .get("/auth")
            .then(res => {
              // If its valid, send user home
              dispatch({ type: "RESTORE_TOKEN", user: res.data.user });
            })
            .catch(() => {
              console.log("/auth 401");
            });
        } else {
          console.log("No Token ❌");
          dispatch({ type: "NO_TOKEN" });
        }
      });
    };

    bootstrapAsync();
  }, []);

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  const Stack = createStackNavigator();

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {state.isSignIn == false ? (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                animationTypeForReplace: state.isSignIn ? "push" : "pop"
              }}
            />
          ) : state.user.role == "admin" ? (
            <Stack.Screen name="Drawer" component={AdminDrawer} />
          ) : state.user.role == "manager" ? (
            <Stack.Screen name="Drawer" component={ManagerDrawer} />
          ) : (
            <Stack.Screen name="Drawer" component={EmployeeDrawer} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
