import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../../apiservices";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    try {
      const response = await loginUser(email.value, password.value);
      if (response.message === "User logged in successfully") {
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("refreshToken", response.refreshToken);
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
        console.log("User data: ", response.user);
        console.log("Login token: ", response.token);
        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Chào mừng quay trở lại!</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Mật khẩu"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Đăng nhập
      </Button>

      <Text>Hoặc:</Text>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 20,
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          onPress={this.signInWithGoogle}
          style={{ paddingRight: 20 }}
        >
          <Image source={require("../assets/google.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.signInWithFacebook}>
          <Image source={require("../assets/facebook.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={{ color: "white", marginLeft: 10 }}>
          Bạn chưa có tài khoản?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Đăng ký ngay!</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  input: {
    borderRadius: 5,
    borderColor: theme.colors.primary,
    padding: 5,
    marginBottom: 10,
  },
});
