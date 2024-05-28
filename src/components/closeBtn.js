import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const CloseBtn = ({ closeEdit }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={closeEdit}>
        <Text style={styles.buttonText}>Close</Text>
        <Icon name="window-close" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 1,
    right: 1,
  },
  button: {
    backgroundColor: "rgba(101, 60, 73, 0.8)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 10,
  },
});

export default CloseBtn;
