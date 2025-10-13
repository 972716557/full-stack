import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import IconFont from "./iconfont";

const styles = StyleSheet.create({
  headerButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181C2E",
  },
});
const HeaderCart = () => (
  <Link href={"/cart"}>
    <View style={[styles.headerButton]}>
      <IconFont name="cart" color="#fff" />
    </View>
  </Link>
);

export default HeaderCart;
