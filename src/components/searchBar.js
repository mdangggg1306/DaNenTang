import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Searchbar = () => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Type a country... Ex: Viet Nam"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: 40,
    paddingLeft: 20,
    borderRadius: 20,
    fontFamily: "Roboto",
    shadowColor: "#000",
    shadowOffset: {
      widthq: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontWeight: "bold",
  },
});

export default Searchbar;
