import { Image } from "expo-image";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import img from "../../assets/burger.png";

import IconFont from "../components/common/iconfont";
import DishDetailSheet from "./dish-detail-sheet";
import { useRef, useState } from "react";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingRight: 100,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  desc: {
    fontSize: 10,
    color: "#646982",
  },
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    fontSize: 10,
    backgroundColor: "#f5f5f5",
  },
  unit: {
    fontSize: 10,
    color: "#FF7622",
    marginRight: 1,
  },
  price: {
    fontSize: 14,
    color: "#FF7622",
    fontWeight: 600,
  },
  rest: {
    fontSize: 12,
    color: "#FF7622",
    fontWeight: 500,
  },
  add: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7622",
  },
});
const Card = ({
  title = "这只鸡很好吃了的罚恶违法罚恶违法罚微风发文罚微风",
  src = img,
  desc = "月售2",
  price = "9.9",
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <Image source={src} style={styles.image} />
      </TouchableWithoutFeedback>
      <View style={{ justifyContent: "space-between" }}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          <Text style={styles.desc}>{desc}</Text>
          <Text style={[styles.desc, styles.tag]}>标签</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          <Text
            style={[styles.tag, { color: "#FF7622", borderColor: "#FF7622" }]}
          >
            Card
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={styles.unit}>¥</Text>
            <Text style={styles.price}>{price?.slice(0, 1)}</Text>
            <Text style={styles.rest}>{price?.slice(1)}</Text>
          </View>
          <View style={styles.add}>
            <IconFont
              name="plus"
              size={12}
              color="#fff"
              style={{ transform: [{ translateX: -1 }] }}
            />
          </View>
        </View>
      </View>
      <DishDetailSheet
        ref={ref}
        visible={visible}
        onClose={() => setVisible(false)}
        zIndex={100}
      />
    </View>
  );
};
export default Card;
