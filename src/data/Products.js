import React from "react";
import {
  FlatList,
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Products({ data }) {
  const navigation = useNavigation();

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { item })}
      style={styles.productItem}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("CartScreen", { item })}
        style={styles.addToCartButton}
      >
        <Text style={styles.addToCartButtonText}>Add to cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Text style={styles.category}>{item.category}</Text>
      <FlatList
        data={item.products}
        renderItem={renderProductItem}
        keyExtractor={(product) => product.id}
        horizontal
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderCategoryItem}
          keyExtractor={(category) => category.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#FFFDD0",
  },
  categoryItem: {
    marginBottom: 20,
  },
  category: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
  },
  productItem: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
    width: 150,
    borderWidth: 1,
  },
  image: {
    width: 150,
    height: 150,
    padding: 10,
    margin: 5,
    marginTop: -11,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "gray",
  },
  addToCartButton: {
    backgroundColor: "blue",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
