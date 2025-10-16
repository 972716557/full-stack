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
import src from "../../../assets/burger.png";

// 获取屏幕宽度
const { width: screenWidth } = Dimensions.get("window");

const data = [
  { title: "咖啡奶茶" },
  { title: "甜点" },
  { title: "买药" },
  { title: "蔬菜水果" },
  { title: "酒店" },
  { title: "数码家电" },
  { title: "鲜花" },
  { title: "美妆" },
  { title: "宠物" },
  { title: "母婴" },
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
            key={item.id}
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
                router.push(`/food/id`);
              }}
            >
              <View>
                <Image style={[styles.itemImage]} source={src} />
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
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
});

export default FiveItemsPerRow;
