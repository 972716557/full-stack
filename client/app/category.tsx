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
import Layout from "app/components/layout/layout";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Banner from "./components/category/banner";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f08e04e3",
    flex: 1,
    paddingHorizontal: 12,
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
  const inset = useSafeAreaInsets();
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

    return {
      opacity,
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [20, 60],
      [160, 120], // 高度从 30→0（标题默认高度）
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollY.value,
      [20, 60],
      [1, 0],
      Extrapolation.CLAMP
    );
    return {
      height,
      opacity: opacity < 0.1 ? 1 : opacity,
      backgroundColor: opacity >= 0.1 ? "#f08e04e3" : "#fff",
    };
  });

  const searchAnimatedStyle = useAnimatedStyle(() => {
    // 搜索框初始位置在标题下方（距离顶部 80），滚动后上移到标题位置（距离顶部 30）
    const top = interpolate(
      scrollY.value,
      [20, 60],
      [0, -42],
      Extrapolation.CLAMP
    );
    const left = interpolate(
      scrollY.value,
      [12, 60],
      [0, 26], // 顶部距离从 80→30（单位：px）
      Extrapolation.CLAMP
    );
    // 同时缩小搜索框宽度，与头部按钮对齐
    const width = interpolate(
      scrollY.value,
      [20, 60],
      [screenWidth - 24, screenWidth - 60],
      Extrapolation.CLAMP
    );

    return {
      top,
      width,
      left,
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Layout
      style={{ backgroundColor: "#f2f3f5", paddingHorizontal: 0 }}
      showSafeView={false}
      header={{
        title: () => (
          <Animated.View
            style={[
              { paddingTop: inset.top },
              styles.header,
              headerAnimatedStyle,
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.common}>
                <IconFont
                  name="arrow-left"
                  size={16}
                  onPress={() => {
                    router.back();
                  }}
                  color="#333"
                />
                <Animated.View
                  style={[
                    titleAnimatedStyle,
                    {
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    },
                  ]}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      router.push("/address");
                    }}
                  >
                    <View style={styles.common}>
                      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                        外卖
                      </Text>
                      <IconFont name="location" size={14} />
                      <Text>中金大厦</Text>
                      <IconFont name="arrow-right" size={8} />
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              </View>
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
        <Banner />
        <View style={{ gap: 8, paddingHorizontal: 8, marginTop: 12 }}>
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
