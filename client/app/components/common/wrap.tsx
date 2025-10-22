import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import cosmetics from "../../../assets/svg/cosmetics.svg";
import desert from "../../../assets/svg/desert.svg";
import electronics from "../../../assets/svg/electronics.svg";
import flower from "../../../assets/svg/flower.svg";
import fruitVegetables from "../../../assets/svg/fruit-vegetables.svg";
import hotel from "../../../assets/svg/hotel.svg";
import medicine from "../../../assets/svg/medicine.svg";
import milkTea from "../../../assets/svg/milk-tea.svg";
import motherBaby from "../../../assets/svg/mother-baby.svg";
import pet from "../../../assets/svg/pet.svg";

// 获取屏幕宽度
const { width: screenWidth } = Dimensions.get("window");

const data = [
  { title: "咖啡奶茶", name: "milk-tea", src: milkTea },
  { title: "甜点", name: "desert", src: desert },
  { title: "买药", name: "medicine", src: medicine },
  { title: "蔬菜水果", name: "fruits-vegetables", src: fruitVegetables },
  { title: "酒店", name: "hotel", src: hotel },
  { title: "数码家电", name: "electronics", src: electronics },
  { title: "鲜花", name: "flower", src: flower },
  { title: "美妆", name: "cosmetics", src: cosmetics },
  { title: "宠物", name: "pet", src: pet },
  { title: "母婴", name: "mother-baby", src: motherBaby },
];
const FiveItemsPerRow = ({ rowNum = 5 }) => {
  // 1. 计算父容器可用宽度（屏幕宽度 - 左右内边距）
  const parentAvailableWidth = screenWidth - (rowNum + 1) * 8;

  // 2. 计算每个元素的强制宽度：(可用宽度 - 4个间隔) / 5
  const itemWidth = (parentAvailableWidth - rowNum * 4) / 5;

  return (
    <View style={[styles.container]}>
      {data.map((item, index) => {
        // 判断是否为每行第5个元素（索引0开始，第4、9、14...个）
        const isFifthInRow = (index + 1) % 5 === 0;

        return (
          <View
            key={index}
            style={[
              styles.item,
              {
                width: itemWidth, // 强制宽度（忽略内容）
                marginBottom: isFifthInRow ? 0 : 8,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                router.push(`/category`);
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image style={[styles.itemImage]} source={item.src} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    padding: 8,
    gap: 8,
  },
  item: {
    // 元素内部内容居中（避免内容自身偏移）
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  itemImage: {
    width: 40,
    height: 40,
    borderBottomRightRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
});

export default FiveItemsPerRow;
