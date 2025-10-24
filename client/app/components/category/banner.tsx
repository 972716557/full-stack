import { StyleSheet, View, Text, Pressable } from "react-native";
import noodles from "../../../assets/svg/noodles.svg";
import steamedBun from "../../../assets/svg/steamed-bun.svg";
import cheungFun from "../../../assets/svg/cheung-fun.svg";
import burger from "../../../assets/svg/burger.svg";
import congee from "../../../assets/svg/congee.svg";
import desert from "../../../assets/svg/desert.svg";
import friedChicken from "../../../assets/svg/fried-chicken.svg";
import spiceHotPot from "../../../assets/svg/spice-hot-pot.svg";
import soybeanMilk from "../../../assets/svg/soybean-milk.svg";
import milkTea from "../../../assets/svg/milk-tea.svg";
import { Image } from "expo-image";
import ScrollWithIndicator from "./scroll-with-indicator";
import { useState } from "react";
const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "contain",
  },
  selectedText: {
    backgroundColor: "#FF7622",
    color: "white",
    borderRadius: 4,
  },
});
const data = [
  { title: "包子", src: steamedBun },
  { title: "米粉面馆", src: noodles },
  {
    title: "面包",
    src: desert,
  },
  {
    title: "肠粉",
    src: cheungFun,
  },
  { title: "粥", src: congee },
  {
    title: "汉堡",
    src: burger,
  },
  {
    title: "奶茶",
    src: milkTea,
  },
  {
    title: "豆浆",
    src: soybeanMilk,
  },
  {
    title: "麻辣烫",
    src: spiceHotPot,
  },
  {
    title: "炸鸡",
    src: friedChicken,
  },
];
const Banner = () => {
  const [selected, setSelected] = useState(data[0].title);
  return (
    <ScrollWithIndicator>
      <View style={{ flexDirection: "row", gap: 16 }}>
        {data.map(({ title, src }) => (
          <Pressable onPress={() => setSelected(title)} key={title}>
            <View style={{ alignItems: "center" }}>
              <Image source={src} style={styles.image} />
              <View
                style={[
                  {
                    marginTop: 4,
                    height: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 4,
                  },
                  selected === title && styles.selectedText,
                ]}
              >
                <Text
                  style={[
                    {
                      fontSize: 12,
                      color: "#333",
                    },
                    selected === title && styles.selectedText,
                  ]}
                >
                  {title}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollWithIndicator>
  );
};

export default Banner;
