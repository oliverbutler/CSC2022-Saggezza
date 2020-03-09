import axios from "axios";
import * as SecureStore from "expo-secure-store";
import "../secrets";

const instance = async () => {
  return SecureStore.getItemAsync("token").then(token => {
    return axios.create({
      baseURL: `http://${ip}:5000/`,
      timeout: 1000,
      headers: { Authorization: "Bearer " + token }
    });
  });
};
export { instance as axios };
