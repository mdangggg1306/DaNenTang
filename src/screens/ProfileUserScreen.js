import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserProfileScreen({ navigation }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const onSignoutPressed = async () => {
    await AsyncStorage.removeItem("token");
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };
  const handleEditProfile = () => {
    // Thực hiện lưu thông tin cá nhân vào cơ sở dữ liệu hoặc API
    console.log("Thông tin đã được lưu:", { name, email, phone });
    // Hiển thị thông báo hoặc thực hiện các thao tác khác ở đây
    setIsEditing(false); // Kết thúc chế độ chỉnh sửa
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePassWordScreen");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Header>Thông tin tài khoản</Header>
        <View>
          <Text style={styles.label}>Tên:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => {
              if (isEditing) setName(text);
            }}
            editable={isEditing}
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              if (isEditing) setEmail(text);
            }}
            keyboardType="email-address"
            editable={isEditing}
          />
          <Text style={styles.label}>Số điện thoại:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={(text) => {
              if (isEditing) setPhone(text);
            }}
            keyboardType="phone-pad"
            editable={isEditing}
          />
          {isEditing ? (
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.editButtonText}>Lưu thông tin</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={handleChangePassword}
        >
          <Text style={styles.changePasswordButtonText}>Thay đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onSignoutPressed}
        >
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileInfo: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  changePasswordButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  changePasswordButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
