import { Link } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import IconFont from "./iconfont";
import useCartCount from "../../store/cart";

const styles = StyleSheet.create({
  headerButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181C2E",
    position: "relative",
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF7622",
    position: "absolute",
    top: -4,
    right: -4,
    zIndex: 10,
  },
});
const HeaderCart = () => {
  const count = useCartCount((state) => state.cartCount);
  return (
    <Link href={"/cart"}>
      <View style={[styles.headerButton]}>
        <IconFont name="cart" color="#fff" />
        {!!count && (
          <View style={styles.badge}>
            <Text style={{ color: "#fff", fontSize: 12 }}>{count}</Text>
          </View>
        )}
      </View>
    </Link>
  );
};

export default HeaderCart;
