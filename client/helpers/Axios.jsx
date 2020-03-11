import axios from "axios";
import * as SecureStore from "expo-secure-store";
import "../secrets";
// import https from "https";

const instance = async () => {
  return SecureStore.getItemAsync("token").then(token => {
    return axios.create({
      baseURL: ip,
      timeout: 1000,
      headers: { Authorization: "Bearer " + token }
    });
  });
};
export { instance as axios };
