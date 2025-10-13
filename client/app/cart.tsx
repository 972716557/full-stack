import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Layout from "./components/layout/layout";
import { useState } from "react";
import IconFont from "./components/common/iconfont";
import { Image } from "expo-image";
import src from "../assets/burger.png";
import { number } from "yup";

const styles = StyleSheet.create({
  edit: {
    color: "#FF7622",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  done: {
    color: "#059C6A",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  footer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 48,
  },
  address: {
    backgroundColor: "#F0F5FA",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 22,
    marginTop: 10,
    marginBottom: 30,
  },
  addressLabel: {
    fontSize: 14,
    color: "#91959C",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 24,
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
  size: {
    fontSize: 15,
    color: "#888891",
  },
  icon: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    backgroundColor: "#41414F",
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    marginHorizontal: 20,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});
const CartCart = () => {
  const [number, setNumber] = useState(0);
  const plus = () => {
    setNumber((i) => i + 1);
  };
  const minus = () => {
    setNumber((i) => i - 1);
  };
  return (
    <View style={{ flexDirection: "row", gap: 20 }}>
      <Image source={src} style={styles.img} />
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          pizza calzone european
        </Text>
        <Text style={styles.price}>$64</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.size}>14''</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={minus}>
              <View style={styles.icon}>
                <IconFont name="minus" color="#fff" size={14} />
              </View>
            </TouchableOpacity>
            <Text style={styles.number}>{number}</Text>
            <TouchableOpacity onPress={plus}>
              <View style={styles.icon}>
                <IconFont name="plus" color="#fff" size={14} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const Cart = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Layout
      safeAreaViewProps={{ edges: ["top", "left", "right"] }}
      style={{
        backgroundColor: "#121223",
        position: "relative",
        padding: 0,
      }}
      header={{
        style: { paddingHorizontal: 12 },
        title: <Text style={{ color: "#fff" }}>Cart</Text>,
        rightNode: (
          <>
            {isEdit ? (
              <Text style={styles.done} onPress={() => setIsEdit(false)}>
                Done
              </Text>
            ) : (
              <Text style={styles.edit} onPress={() => setIsEdit(true)}>
                EDIT Items
              </Text>
            )}
          </>
        ),
      }}
    >
      <ScrollView>
        <View style={{ gap: 32, paddingVertical: 12, paddingHorizontal: 24 }}>
          {[1, 2, 3].map((item) => (
            <CartCart />
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, color: "#A0A5BA" }}>
            Delivery Address
          </Text>
          <Text
            style={{
              color: "#FF7622",
              textDecorationLine: "underline",
              fontSize: 16,
            }}
          >
            Edit
          </Text>
        </View>
        <View style={styles.address}>
          <Text style={styles.addressLabel}>2118 Thornridge Cir. Syracuse</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "#91959C", marginRight: 12 }}>
              Total:
            </Text>
            <Text style={{ fontSize: 30 }}>$96</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ color: "#FF7622", fontSize: 16, marginRight: 4 }}>
              Breakdown
            </Text>
            <IconFont name="arrow-right" size={12} />
          </View>
        </View>
        <Text
          style={{
            backgroundColor: "#FF7622",
            borderRadius: 16,
            textAlign: "center",
            padding: 16,
            marginTop: 32,
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Place Order
        </Text>
      </View>
    </Layout>
  );
};
export default Cart;
