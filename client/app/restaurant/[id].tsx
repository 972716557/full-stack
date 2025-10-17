import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
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
import AddressSheet from "app/components/common/address-sheet";

const RestaurantDetail = () => {
  const scrollY = useSharedValue(0);
  const inset = useSafeAreaInsets();

  const searchAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 200], // 触发区间
      [0, 1], // 透明度从 1→0
      Extrapolation.CLAMP
    );
    return {
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    };
  });

  const locationAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 200], // 触发区间
      [0, 1], // 透明度从 1→0
      Extrapolation.CLAMP
    );

    return {
      display: opacity > 0.5 ? "flex" : "none",
      flex: 1,
    };
  });

  const searchInputAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 200], // 触发区间
      [0, 1], // 透明度从 1→0
      Extrapolation.CLAMP
    );
    return {
      display: opacity > 0.5 ? "none" : "flex",
      flex: 1,
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
      style={{ paddingHorizontal: 0 }}
      safeAreaViewProps={{
        edges: ["left", "right"],
      }}
      header={{
        title: () => (
          <Animated.View
            style={[
              {
                paddingHorizontal: 12,
                flex: 1,
                position: "absolute",
                top: 0,
                paddingTop: inset.top,
                paddingBottom: 12,
                left: 0,
                right: 0,
                zIndex: 99,
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0)",
              },
              searchAnimatedStyle,
            ]}
          >
            <BackButton />
            <Animated.View style={searchInputAnimatedStyle}>
              <SearchInput isFakeInput placeholder="搜索店内商品" />
            </Animated.View>
            <Animated.View style={locationAnimatedStyle}>
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
    >
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16} // 16ms 触发一次，确保动画流畅
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff", flex: 1, paddingTop: inset.top + 50 }}
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
