import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import IconFont from "app/components/common/iconfont";
import RestaurantCard from "app/components/restaurant/restaurant-card";
import { router } from "expo-router";
import SearchInput from "app/components/common/search-input";
import HeaderCart from "app/components/common/header-cart";
import Layout from "app/components/layout/layout";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import FiveItemsPerRow from "app/components/common/wrap";

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
    backgroundColor: "#c6caceff",
  },
  common: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

const { width: screenWidth } = Dimensions.get("window");

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
      [screenWidth - 16, screenWidth - 116], // 宽度从 80%→60%
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
      style={{ backgroundColor: "#f2f3f5" }}
      safeAreaViewProps={{ edges: ["left", "right", "top"] }}
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
                <Animated.View
                  style={[titleAnimatedStyle, { justifyContent: "center" }]}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      router.push("/address");
                    }}
                  >
                    <View style={styles.common}>
                      <IconFont name="location" />
                      <Text>中金大厦</Text>
                      <IconFont name="arrow-down" />
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              </View>
              <HeaderCart />
            </View>
            <Animated.View style={[searchAnimatedStyle]}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={(e) => {
                  router.push("/search");
                }}
              >
                <SearchInput isFakeInput />
              </TouchableOpacity>
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
        <View style={{ gap: 8, marginTop: 12 }}>
          <FiveItemsPerRow />
          <View style={{ gap: 8 }}>
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
          </View>
        </View>
      </Animated.ScrollView>
    </Layout>
  );
};
export default Home;
