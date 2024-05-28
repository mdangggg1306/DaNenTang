import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Button from "../components/Button";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { changePassword } from "../../apiservices";

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [enteredCurrentPassword, setEnteredCurrentPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentPassword(user.password);
      }
    };

    fetchUserData();
  }, []);

  const handleChangePassword = async () => {
    if (!enteredCurrentPassword || !newPassword || !confirmNewPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    // Gửi yêu cầu đến server để thay đổi mật khẩu
    try {
      const userData = await AsyncStorage.getItem("user");
      const user = JSON.parse(userData);
      const response = await changePassword(
        user.email,
        enteredCurrentPassword,
        newPassword
      );
      console.log(response);

      if (response && response.message === "Password changed successfully") {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        Alert.alert("Success", "Mật khẩu đã được thay đổi thành công.");
        navigation.goBack();
      } else if (response && response.data) {
        Alert.alert("Error", response.data.message);
      } else {
        Alert.alert("Error", "An unknown error occurred.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while changing the password.");
    }
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />

      <Header>Đổi mật khẩu</Header>
      <Text style={styles.label}>Mật khẩu hiện tại:</Text>
      <TextInput
        style={styles.input}
        value={enteredCurrentPassword}
        onChangeText={setEnteredCurrentPassword}
        secureTextEntry={true}
      />
      <Text style={styles.label}>Mật khẩu mới:</Text>
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
      />
      <Text style={styles.label}>Xác nhận mật khẩu mới:</Text>
      <TextInput
        style={styles.input}
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        secureTextEntry={true}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleChangePassword}>
        Thay đổi mật khẩu
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
