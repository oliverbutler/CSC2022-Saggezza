import axios from "axios";
import * as SecureStore from "expo-secure-store";
import "../secrets";

const instance = async formData => {
  return SecureStore.getItemAsync("token").then(token => {
    var AxiosHeader = { Authorization: "Bearer " + token };

    if (formData) {
      AxiosHeader["Content-Type"] = "multipart/form-data";
    }

    console.log(AxiosHeader);

    return axios.create({
      baseURL: ip,
      timeout: 1000,
      headers: AxiosHeader
    });
  });
};
export { instance as axios };
