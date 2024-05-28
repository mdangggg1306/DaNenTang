import { SERVER_IP_USERS, SERVER_IP_CATE } from "./config";
import api from "./apiinterceptor";

export const loginUser = async (email, password) => {
  const response = await api.post("/api/users/login", { email, password });
  return response.data;
};

export const registerUser = async (name, email, password, phone) => {
  try {
    const response = await api.post(`${SERVER_IP_USERS}/register`, {
      name,
      email,
      password,
      phone,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

export const resetPassword = async (email, newpassword, confirmpassword) => {
  try {
    const response = await api.post(`${SERVER_IP_USERS}/reset-password`, {
      email,
      newpassword,
      confirmpassword,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

export const changePassword = async (email, currentPassword, newPassword) => {
  try {
    const response = await api.post(`${SERVER_IP_USERS}/change-password`, {
      email,
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get(`${SERVER_IP_CATE}`);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
