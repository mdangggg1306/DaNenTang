import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartScreen({ route, navigation }) {
  const item = route.params ? route.params.item : null;
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (productToAdd) => {
    const existingProduct = cartItems.find(
      (item) => item.id === productToAdd.id
    );
    let updatedCartItems = [];
    if (existingProduct) {
      updatedCartItems = cartItems.map((item) => {
        if (item.id === existingProduct.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      updatedCartItems = [...cartItems, { ...productToAdd, quantity: 1 }];
    }
    setCartItems(updatedCartItems);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const loadCartFromStorage = async () => {
      const storedCart = await AsyncStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };

    loadCartFromStorage();
  }, []);

  useEffect(() => {
    if (item) {
      addToCart(item);
    }
  }, [item]);
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.img} />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>
          {item.name}
        </Text>
        <Text style={styles.price}>Giá: {item.price} VNĐ</Text>
        <Text style={styles.quantity}>Số lượng:</Text>
        <View style={styles.quantitybox}>
          <Button
            title="-"
            onPress={() => decreaseQuantity(item.id)}
            style={styles.btn}
          />
          <Text style={{ fontSize: 16, marginHorizontal: 20 }}>
            {item.quantity}
          </Text>
          <Button
            title="+"
            onPress={() => increaseQuantity(item.id)}
            style={styles.btn}
          />
        </View>
      </View>
      <View style={styles.delete}>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Image
            style={{ height: 30, width: 30 }}
            source={require("../assets/trash.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const priceInVND = parseFloat(item.price.replace(/\./g, ""));
      total += priceInVND * item.quantity;
    });
    return total;
  };
  const formatNumberWithDot = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const increaseQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  return (
    <>
      <Text style={styles.header}>Giỏ hàng</Text>
      {cartItems.length === 0 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 200,
          }}
        >
          <Image source={require("../assets/empty-cart.png")} />
          <Text
            style={{
              fontSize: 24,
              margin: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Your shopping cart is empty.
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>
              Tổng tiền: {formatNumberWithDot(calculateTotal())} VNĐ
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CheckoutScreen", { cartItems })
              }
              style={styles.checkoutButton}
            >
              <Text style={styles.checkoutText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
  },
  img: {
    width: 120,
    height: 120,
  },
  info: {
    marginLeft: 30,
    width: 120,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
  },
  quantity: {
    fontSize: 14,
  },
  footer: {
    backgroundColor: "#ccc",
    padding: 20,
    alignItems: "center",
  },
  total: {
    fontSize: 20,
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
  },
  quantitybox: {
    flexDirection: "row",
    alignContent: "space-between",
    width: 60,
  },
  btn: {
    height: 30,
    width: 50,
  },
  delete: {
    marginTop: 80,
    marginRight: 50,
  },
});
