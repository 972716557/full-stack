import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  LayoutChangeEvent,
} from "react-native";
import Layout from "../components/layout/layout";
import Card from "./_card";
import { Image } from "expo-image";
import Animated from "react-native-reanimated";
import banner from "../../assets/burger.png";
import Info from "./_info";
import Scroll from "./_scroll";
import TopTabExample from "./_tab";

const AnchorLinkExample = () => {
  return (
    <Layout
      style={{ paddingHorizontal: 0, backgroundColor: "#F5F5F5" }}
      header={{ style: { paddingHorizontal: 12 } }}
      safeAreaViewProps={{ edges: ["left", "right", "top"] }}
    >
      <ScrollView style={{ backgroundColor: "#fff", flexGrow: 0 }}>
        <View style={[styles.banner]}>
          <Image
            style={[styles.bannerImg]}
            source={banner}
            contentFit="cover"
          />
        </View>
        <Info />
      </ScrollView>
      <TopTabExample />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", // 左右布局
    backgroundColor: "#f5f5f5",
  },
  // 左侧分类容器
  leftContainer: {
    width: 100,
    borderRightWidth: 1,
    borderRightColor: "#eee",
    backgroundColor: "#f9f8f8ff",
    flexGrow: 0,
  },
  leftTab: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  leftTabActive: {
    backgroundColor: "#f0f7ff", // 选中项背景色
  },
  leftTabText: {
    fontSize: 14,
    color: "#333",
  },
  leftTabTextActive: {
    color: "#2196f3", // 选中项文字色
    fontWeight: "bold",
  },
  // 右侧内容容器
  rightContainer: {
    flex: 1, // 占剩余宽度
    gap: 40,
    height: 600,
  },
  rightSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionDesc: {
    color: "#666",
  },
  banner: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  bannerImg: {
    width: "100%",
    height: 200,
    objectFit: "fill",
    borderRadius: 10,
  },
});

export default AnchorLinkExample;
