import * as SecureStore from "expo-secure-store";
import JWTDecode from "jwt-decode";

const key = "authToken";

const storeToken = (authToken) => {
  try {
    SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing the auth token");
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the token");
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing auth token");
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? JWTDecode(token) : null;
};

export default { removeToken, getUser, storeToken, getToken };
