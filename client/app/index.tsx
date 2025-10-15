import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconFont from "./components/common/iconfont";
import { Image } from "expo-image";
import src from "../assets/burger.png";
import RestaurantCard from "./components/resturant/restaurant-card";
import { Link, router } from "expo-router";
import SearchInput from "./components/common/search-input";
import HeaderCart from "./components/common/header-cart";
import Layout from "./components/layout/layout";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useState } from "react";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 12,
  },
  headerButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtonConfig: {
    backgroundColor: "#ECF0F4",
  },
  headerButtonCart: {
    backgroundColor: "#181C2E",
  },
  common: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
  },
  deliverTo: {
    color: "#FC6E2A",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  mb16: {
    marginBottom: 16,
  },
  input: {
    height: 62,
    borderRadius: 12,
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
  },
  card: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000", // 阴影颜色（深色更立体）
        shadowOffset: { width: 0, height: 4 }, // 阴影偏移（向下4px，增强悬浮感）
        shadowOpacity: 0.15, // 阴影透明度（0.1-0.3 较自然）
        shadowRadius: 8, // 阴影模糊半径（值越大越柔和）
      },
      android: {
        // Android 原生阴影（elevation 值越大，阴影越明显）
        elevation: 8,
        // 可选：Android 10+ 支持通过 outline 微调阴影（需配合 borderRadius）
        outlineStyle: "none",
      },
    }),
  },
  cardImg: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    objectFit: "fill",
    backgroundColor: "#98A8B8",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 500,
  },
});

const { width: screenWidth } = Dimensions.get("window");
const Card = ({ title }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/food/id`);
      }}
    >
      <View
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "#f0f0f0",
          },
        ]}
      >
        <View style={styles.card}>
          <Image style={styles.cardImg} source={src} />
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const Home = () => {
  const scrollY = useSharedValue(0);
  // 标题动画样式（滚动时隐藏）
  const titleAnimatedStyle = useAnimatedStyle(() => {
    // 当滚动距离超过 20 时开始隐藏，超过 60 完全隐藏
    const opacity = interpolate(
      scrollY.value,
      [20, 60], // 触发区间
      [1, 0], // 透明度从 1→0
      Extrapolation.CLAMP
    );
    const height = interpolate(
      scrollY.value,
      [20, 60],
      [40, 0], // 高度从 30→0（标题默认高度）
      Extrapolation.CLAMP
    );

    return {
      opacity,
      height,
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [20, 60],
      [80, 40], // 高度从 30→0（标题默认高度）
      Extrapolation.CLAMP
    );

    return {
      height,
    };
  });

  const searchAnimatedStyle = useAnimatedStyle(() => {
    // 搜索框初始位置在标题下方（距离顶部 80），滚动后上移到标题位置（距离顶部 30）
    const top = interpolate(
      scrollY.value,
      [20, 60],
      [0, -52], // 顶部距离从 80→30（单位：px）
      Extrapolation.CLAMP
    );
    const left = interpolate(
      scrollY.value,
      [20, 60],
      [0, 50], // 顶部距离从 80→30（单位：px）
      Extrapolation.CLAMP
    );
    // 同时缩小搜索框宽度，与头部按钮对齐
    const width = interpolate(
      scrollY.value,
      [20, 60],
      [screenWidth - 40, screenWidth - 140], // 宽度从 80%→60%
      Extrapolation.CLAMP
    );

    return {
      top,
      width,
      left,
    };
  });
  const onTouchConfig = () => {
    router.push("/config");
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  return (
    <Layout
      header={{
        title: () => (
          <Animated.View style={[{ flex: 1 }, headerAnimatedStyle]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.common}>
                <View
                  style={[styles.headerButton, styles.headerButtonConfig]}
                  onTouchEnd={onTouchConfig}
                >
                  <IconFont name="menu" />
                </View>
                <Animated.View style={[titleAnimatedStyle]}>
                  <Text style={styles.deliverTo}>Deliver to</Text>
                  <View style={styles.common}>
                    <Text>Halal Lab office</Text>
                    <IconFont name="arrow-down" />
                  </View>
                </Animated.View>
              </View>
              <HeaderCart />
            </View>
            <Animated.View style={[searchAnimatedStyle]}>
              <SearchInput />
            </Animated.View>
          </Animated.View>
        ),
      }}
    >
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16} // 16ms 触发一次，确保动画流畅
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.row,
            { justifyContent: "space-between", marginVertical: 20 },
          ]}
        >
          <Text style={{ fontSize: 20 }}>All Categories</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/categories");
            }}
          >
            <View style={styles.row}>
              <Text>See All</Text>
              <IconFont name="arrow-right" size={12} />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Card title="Vegetables" />
            <Card title="Fruits" />
            <Card title="Meat & Fish" />
            <Card title="Beverages" />
            <Card title="Snacks" />
          </View>
        </ScrollView>
        <View
          style={[
            styles.row,
            { justifyContent: "space-between", marginVertical: 20 },
          ]}
        >
          <Text style={{ fontSize: 20 }}>Open Restaurants</Text>
          <View style={styles.row}>
            <Text>See All</Text>
            <IconFont name="arrow-right" size={12} />
          </View>
        </View>
        <View style={{ gap: 20, marginBottom: 20 }}>
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
        </View>
      </Animated.ScrollView>
    </Layout>
  );
};
export default Home;
