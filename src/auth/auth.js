import { getToken, refreshToken } from "./token";
import { SERVER_IP } from "../../config";
export const verifyToken = async (token) => {
  try {
    const response = await fetch(`${SERVER_IP}/verify-token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      const newToken = await refreshToken();
      if (newToken) {
        return true;
      } else {
        return false;
      }
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};
