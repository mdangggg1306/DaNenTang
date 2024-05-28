import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { Text } from "react-native";

export default function CountryRender({ navigation }) {
  return (
    <Background>
      <Logo
        style={{
          marginTop: 500,
        }}
      />

      <Header>Country App Mobile</Header>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          lineHeight: 21,
          textAlign: "center",
          marginBottom: 12,
        }}
      ></Text>
      <Paragraph>
        Cung cấp thông tin cần thiết về các quốc gia bạn cần !{" "}
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Bắt đầu nào
      </Button>
    </Background>
  );
}
