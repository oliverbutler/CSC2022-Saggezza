import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React from "react";
import RequestNew from "./components/Request/RequestNew";
import AppContext from "./context/AppContext";
import AppDrawer from "./navigation/AppDrawer";
import Login from "./screens/Login";
import SplashScreen from "./screens/SplashScreen";
import * as Permissions from "expo-permissions";

import {
  TransitionSpecs,
  CardStyleInterpolators
} from "@react-navigation/stack";
// import ClientNew from "./components/Client/ClientNew";
// import RequestAddParams from "./components/Request/RequestAddParams";

import Modal from "./screens/Modal";

const initialState = {
  user: null, // user model from server
  isLoading: true,
  isSignIn: false,
  users: [],
  requests: [],
  clients: [],
  projects: [],
  categories: []
};

const findUser = (arr, id) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id == id) {
      return i;
    }
  }
  return -1;
};

const reducer = (prevState, action) => {
  console.log(`🟩 Action ▶ ${JSON.stringify(action).substring(0, 200)}...`);
  switch (action.type) {
    case "SET_USERS":
      return {
        ...prevState,
        users: action.payload
      };
    case "SET_USER":
      newUsers = prevState.users.slice();
      index = findUser(prevState.users, action.payload.id);

      if (index > -1) {
        newUsers[index] = action.payload;
        return {
          ...prevState,
          users: newUsers
        };
      }
      newUsers.push(action.payload);
      return {
        ...prevState,
        users: newUsers
      };

    case "SET_REQUESTS":
      return {
        ...prevState,
        requests: action.payload
      };
    case "SET_REQUEST":
      newRequests = prevState.requests.slice();
      index = findUser(prevState.requests, action.payload.id);

      if (index > -1) {
        newRequests[index] = action.payload;
        return {
          ...prevState,
          requests: newRequests
        };
      }
      newRequests.push(action.payload);
      return {
        ...prevState,
        requests: newRequests
      };
    case "SET_CLIENTS":
      return {
        ...prevState,
        clients: action.payload
      };
    case "SET_CLIENT":
      newClients = prevState.clients.slice();
      index = findUser(prevState.clients, action.payload.id);

      if (index > -1) {
        newClients[index] = action.payload;
        return {
          ...prevState,
          clients: newClients
        };
      }
      newClients.push(action.payload);
      return {
        ...prevState,
        clients: newClients
      };
    case "SET_PROJECTS":
      return {
        ...prevState,
        projects: action.payload
      };
    case "SET_PROJECT":
      newProjects = prevState.projects.slice();
      index = findUser(prevState.projects, action.payload.id);

      if (index > -1) {
        newProjects[index] = action.payload;
        return {
          ...prevState,
          projects: newProjects
        };
      }
      newProjects.push(action.payload);
      return {
        ...prevState,
        projects: newProjects
      };
    case "SET_CATEGORIES":
      return {
        ...prevState,
        categories: action.payload
      };
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
      SecureStore.deleteItemAsync("token");
      return {
        ...prevState,
        user: null,
        isSignIn: false,
        isLoading: false
      };
    case "SHOW":
      return {
        ...prevState,
        show: action.payload
      };
    case "TITLE":
      return {
        ...prevState,
        title: action.payload
      };
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      // Try get token from SecureStore, if its there, dispatch restore token

      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      // only asks if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      // On Android, permissions are granted on app installation, so
      // `askAsync` will never prompt the user

      // Stop here if the user did not grant permissions
      if (status !== "granted") {
        alert("No notification permissions!");
      }

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
              SecureStore.deleteItemAsync("token");
              dispatch({ type: "NO_AUTH" });
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
          ) : (
            <Stack.Screen name="Drawer" component={AppDrawer} />
          )}
          <Stack.Screen
            name="Modal"
            component={Modal}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
