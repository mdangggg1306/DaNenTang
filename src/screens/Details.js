import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BackButton from "../components/BackButton";

export default function Details({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;
  return (
    <>
      <Image
        source={{ uri: item.image }}
        style={{
          width: "100%",
          height: "50%",
        }}
      />
      <BackButton goBack={navigation.goBack} />
      <View style={styles.detail}>
        <Text style={styles.h1}>Tên sản phẩm: {item.name}</Text>
        <Text style={styles.h1}>Giá: {item.price}</Text>
        <View>
          <Text style={styles.h1}>Thông tin sản phẩm:</Text>
          <FlatList
            data={item.describe}
            renderItem={({ item }) => <Text>{item}</Text>}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("CartScreen", { item })}
        style={styles.btn}
      >
        <Text style={{ textAlign: "center", color: "white" }}>
          Them gio hang
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  detail: {
    backgroundColor: "#FFFDD0",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 30,
    position: "absolute",
    top: "45%",
    width: "100%",
    height: "100%",
  },
  h1: {
    fontSize: 20,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#008B8B",
    padding: 15,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderRadius: 20,
  },
});
