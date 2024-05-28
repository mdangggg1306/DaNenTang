import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CheckoutScreen({ route, navigation }) {
  const { cartItems } = route.params;
  const [customerName, setCustomerName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const handlePlaceOrder = ({ navigation }) => {
    // Implement order processing logic here, potentially sending data to a server
    if (
      customerName.length === 0 ||
      billingAddress.length === 0 ||
      phoneNumber.length === 0
    ) {
      alert(" bạn vui lòng nhập đầy đủ thông tin");
      return false;
    }
    alert("bạn đã đặt hàng thành công...");
    navigation.goBack(); // Go back to CartScreen after placing order
  };

  const renderOrderSummary = () => {
    return (
      <View style={styles.orderSummaryContainer}>
        <Text style={styles.orderSummaryTitle}>Thông tin đơn hàng</Text>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.orderInfoLabel}>Họ và tên:</Text>
          <Text style={styles.orderInfoValue}>{customerName}</Text>
          <Text style={styles.orderInfoLabel}>Địa chỉ:</Text>
          <Text style={styles.orderInfoValue}>{billingAddress}</Text>
          <Text style={styles.orderInfoLabel}>Số điện thoại:</Text>
          <Text style={styles.orderInfoValue}>{phoneNumber}</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text>
            ---------------------------------------------------------------------
          </Text>
        </View>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <Text style={styles.orderItemName}>{item.name}</Text>
            <Text style={styles.orderItemQuantity}>
              Số lượng: {item.quantity}
            </Text>
            <Text style={styles.orderItemPrice}>
              Giá:{" "}
              {formatNumberWithDot(
                parseFloat(item.price.replace(/\./g, "")) * item.quantity
              )}{" "}
              VNĐ
            </Text>
          </View>
        ))}
        <View style={styles.orderTotal}>
          <Text style={styles.orderTotalLabel}>Tổng tiền:</Text>
          <Text style={styles.orderTotalValue}>
            {formatNumberWithDot(calculateTotal())} VNĐ
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Image
              style={{
                width: 150,
                height: 90,
              }}
              source={require("../assets/logo.png")}
            />
          </View>
          <View>
            <Text
              style={{
                marginTop: 10,
                marginLeft: 15,
                width: "100%",
                fontSize: 25,
                color: "#0A8D61",
                fontWeight: "bold",
                paddingVertical: 20,
                textAlign: "center",
              }}
            >
              MAGIC BILLIARD{" "}
            </Text>
          </View>
        </View>
        <Text style={styles.header}>Thông tin thanh toán</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Họ và tên:</Text>
          <TextInput
            style={styles.infoInput}
            value={customerName}
            onChangeText={(setName) => setCustomerName(setName)}
            placeholder="Nhập họ và tên"
          />
          <Text style={styles.infoLabel}>Địa chỉ nhận hàng:</Text>
          <TextInput
            style={styles.infoInput}
            value={billingAddress}
            onChangeText={(setAddress) => setBillingAddress(setAddress)}
            placeholder="Nhập địa chỉ thanh toán"
          />
          <Text style={styles.infoLabel}>Số điện thoại:</Text>
          <TextInput
            style={styles.infoInput}
            value={phoneNumber}
            onChangeText={(setPhone) => setPhoneNumber(setPhone)}
            placeholder="Nhập số điện thoại"
            keyboardType="numeric" // Set keyboard type for phone numbers
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text>
            ---------------------------------------------------------------------
          </Text>
        </View>
        {renderOrderSummary()}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}
          >
            <Text style={styles.placeOrderText}>Đặt hàng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eff7f8" },
  body: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 25,
    color: "#0A8D61",
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoInput: {
    height: 44,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#21a3d0",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "#000000",
  },
  orderSummaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderItem: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderItemName: {
    fontSize: 16,
  },
  orderItemQuantity: {
    fontSize: 14,
  },
  orderItemPrice: {
    fontSize: 14,
  },
  orderTotal: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderTotalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderTotalValue: {
    fontSize: 18,
  },
  placeOrderButton: {
    width: 150,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  placeOrderText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
