import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Image } from "expo-image";
import React from "react";
import FontIcon from "../common/iconfont";
import source from "../../../assets/burger.png";
import { Link, router } from "expo-router";
import Dish from "./dish";

const styles = StyleSheet.create({
  card: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  container: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    color: "#181C2E",
    fontWeight: 500,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    objectFit: "fill",
  },
  desc: {
    fontSize: 12,
    color: "#A0A5BA",
    fontWeight: 400,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tip: {
    fontSize: 12,
    fontWeight: 500,
    color: "#FF7622",
  },
  star: {
    fontSize: 14,
    fontWeight: 600,
    color: "#FF7622",
    marginRight: 2,
  },
  starLabel: {
    fontSize: 12,
    color: "#FF7622",
  },
  tag: {
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: "#fcdfcbff",
  },
  menu: {
    flexDirection: "row",
    gap: 8,
  },
});

const RestaurantCard = ({
  title = "去茶山（深圳万象前海点）",
  distance = "1.5km",
  menu = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  tip = "新店开张",
  src = source,
  sale = "月售2",
  enough = "起送￥10",
  time = "30分钟",
  star = "4.5",
}) => {
  return (
    <>
      <View style={styles.card}>
        <TouchableWithoutFeedback
          onPress={() => {
            router.push(`/restaurant/id`);
          }}
        >
          <View style={styles.container}>
            <Image source={src} style={styles.image} />
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.info}>
                  <Text style={styles.desc}>{sale}</Text>
                  <Text style={styles.desc}>{enough}</Text>
                  <Text style={styles.tip}>免运费</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.desc}>{time}</Text>
                  <Text style={styles.desc}>{distance}</Text>
                </View>
              </View>
              <View style={styles.info}>
                <Text>
                  <Text style={styles.star}>{star}</Text>
                  <Text style={styles.starLabel}>分</Text>
                </Text>
                <View style={styles.tag}>
                  <Text style={{ color: "#FF7622", fontSize: 12 }}>{tip}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.menu}>
            {menu.map((item, index) => (
              <Dish key={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default RestaurantCard;
