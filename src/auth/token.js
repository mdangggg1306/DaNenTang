import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_IP } from "../../config";

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      return value;
    }
  } catch (e) {}
};

export const getRefreshToken = async () => {
  try {
    const value = await AsyncStorage.getItem("refreshToken");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await fetch(`${SERVER_IP}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem("token", data.token);
      return data.token;
    } else {
      console.error("Refresh token failed");
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};
