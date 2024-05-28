import React, { useState, useEffect } from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import Products from "../data/Products";
import { getCategories } from "../../apiservices";

export default function MainScreen({}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories();
        setData(categories);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo.png")}
          style={{
            height: 70,
            width: 110,
          }}
        />
        <Text style={styles.txt}>Tất cả mọi thứ về bi-da</Text>
      </View>
      <View style={styles.list}>
        <Products data={data} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginTop: 20,
  },
  txt: {
    fontWeight: "500",
    marginTop: 25,
    marginLeft: 10,
    fontSize: 20,
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    flex: 1,
    marginTop: -20,
  },
});
