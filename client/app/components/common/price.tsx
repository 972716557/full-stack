import { View, Text, StyleSheet } from "react-native";
const style = StyleSheet.create({
  price: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  dot: {
    fontSize: 12,
    color: "red",
  },
});
const Price = ({ price, dot }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "baseline" }}>
      <Text style={style.dot}>￥</Text>
      <Text style={style.price}>{price}</Text>
      <Text style={style.dot}>{dot}</Text>
    </View>
  );
};

export default Price;
