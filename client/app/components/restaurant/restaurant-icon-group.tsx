import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconFont from "../common/iconfont";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
const RestaurantIconGroup = () => {
  return (
    <View style={{ flexDirection: "row", gap: 16, marginTop: 8 }}>
      <View style={styles.row}>
        <IconFont name="star" color="#FF7622" />
        <Text>4.5</Text>
      </View>
      <View style={styles.row}>
        <IconFont name="car" color="#FF7622" />
        <Text>free</Text>
      </View>
      <View style={styles.row}>
        <IconFont name="clock" color="#FF7622" />
        <Text>20 min</Text>
      </View>
    </View>
  );
};

export default RestaurantIconGroup;
