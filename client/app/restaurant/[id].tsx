import React, { use, useRef, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Layout from "../components/layout/layout";
import { Image } from "expo-image";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import banner from "../../assets/burger.png";
import Info from "./_info";
import TopTabExample from "./_tab";
import BackButton from "app/components/layout/back-button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchInput from "app/components/common/search-input";
import IconFont from "app/components/common/iconfont";
import SelectAddress from "app/components/common/select-address";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import AddressSheet from "app/components/common/address-sheet";

const screenHeight = Dimensions.get("window").height;
const RestaurantDetail = () => {
  const scrollY = useSharedValue(0);
  const inset = useSafeAreaInsets();

  const searchAnimatedStyle = useAnimatedStyle(() => {
    // 搜索框初始位置在标题下方（距离顶部 80），滚动后上移到标题位置（距离顶部 30）
    const opacity = interpolate(
      scrollY.value,
      [0, 50], // 触发区间
      [0, 1], // 透明度从 1→0
      Extrapolation.CLAMP
    );

    return {
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    };
  });
  const locationAnimatedStyle = useAnimatedStyle(() => {
    // 搜索框初始位置在标题下方（距离顶部 80），滚动后上移到标题位置（距离顶部 30）
    const opacity = interpolate(
      scrollY.value,
      [0, 50], // 触发区间
      [0, 1], // 透明度从 1→0
      Extrapolation.CLAMP
    );

    return {
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    };
  });

  const searchInputAnimatedStyle = useAnimatedStyle(() => {
    // 搜索框初始位置在标题下方（距离顶部 80），滚动后上移到标题位置（距离顶部 30）
    const opacity = interpolate(
      scrollY.value,
      [0, 50], // 触发区间
      [0, 1], // 透明度从 1→0
      Extrapolation.CLAMP
    );

    return {
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (scrollY) {
        scrollY.value = event.contentOffset.y;
      }
    },
  });

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const handleSheetChange = (index) => {
    if (index === -1) {
      setVisible(false);
    }
  };

  return (
    <Layout
      style={{ paddingHorizontal: 0, backgroundColor: "#F5F5F5" }}
      header={{
        title: () => (
          <Animated.View
            style={[
              {
                paddingHorizontal: 12,
                flex: 1,
                paddingTop: inset.top,
                paddingBottom: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "center",
              },
              searchAnimatedStyle,
            ]}
          >
            <BackButton />
            <Animated.View style={searchAnimatedStyle}>
              <SearchInput
                isFakeInput
                placeholder="搜索店内商品"
                style={{ flex: 1 }}
              />
            </Animated.View>
            <Animated.View style={searchAnimatedStyle}>
              <SelectAddress
                onPress={() => {
                  setVisible(true);
                }}
              />
            </Animated.View>
            <IconFont name="star" />
            <IconFont name="more" />
          </Animated.View>
        ),
      }}
      safeAreaViewProps={{ edges: ["left", "right"] }}
    >
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16} // 16ms 触发一次，确保动画流畅
        showsVerticalScrollIndicator={false}
        // style={{ backgroundColor: "#fff", flex: 1 }}
      >
        <View style={[styles.banner]}>
          <Image
            style={[styles.bannerImg]}
            source={banner}
            contentFit="cover"
          />
        </View>
        <Info />
        <TopTabExample />
      </Animated.ScrollView>
      {/* 底部抽屉组件 */}
      <AddressSheet
        ref={ref}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
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

export default RestaurantDetail;
