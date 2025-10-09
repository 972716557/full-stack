import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import React from "react";
import FontIcon from "./iconfont";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "#181C2E",
    fontWeight: 600,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 16,
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: "#A0A5BA",
    fontWeight: 400,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

const RestaurantCard = () => {
  return (
    <View>
      <Image source={require("../../assets/humber.png")} style={styles.image} />
      <Text style={styles.title}>Restaurant Card</Text>
      <Text style={styles.desc}>Burger - Chiken - Riche - Wings </Text>
      <View style={{ flexDirection: "row", gap: 16, marginTop: 8 }}>
        <View style={styles.row}>
          <FontIcon name="star" color="#FF7622" />
          <Text>4.5</Text>
        </View>
        <View style={styles.row}>
          <FontIcon name="car" color="#FF7622" />
          <Text>free</Text>
        </View>
        <View style={styles.row}>
          <FontIcon name="clock" color="#FF7622" />
          <Text>20 min</Text>
        </View>
      </View>
    </View>
  );
};
export default RestaurantCard;
