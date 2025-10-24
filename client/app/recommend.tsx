import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import Layout from "./components/layout/layout";
import BackButton from "./components/layout/back-button";
import SelectAddress from "./components/common/select-address";
import { use, useRef, useState } from "react";
import AddressSheet from "./components/common/address-sheet";
import IconFont from "./components/common/iconfont";
import { Image } from "expo-image";
import TagWithWrappingText from "./components/common/tag-with-wrapping-text";
import image from "../assets/burger.png";
import thunder from "../assets/svg/thunder.svg";
import noodles from "../assets/svg/noodles.svg";
import steamedBun from "../assets/svg/steamed-bun.svg";
import cheungFun from "../assets/svg/cheung-fun.svg";
import burger from "../assets/svg/burger.svg";
import desert from "../assets/svg/desert.svg";
import spiceHotPot from "../assets/svg/spice-hot-pot.svg";
import soybeanMilk from "../assets/svg/soybean-milk.svg";
import milkTea from "../assets/svg/milk-tea.svg";
import Price from "./components/common/price";
import SearchInput from "./components/common/search-input";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    gap: 12,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  tagLabel: {
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 4,
    borderRadius: 2,
    paddingVertical: 2,
    backgroundColor: "#f86729ff",
    fontSize: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginRight: 4,
  },
  content: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tag: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#e8723fff",
    color: "#e8723fff",
    fontSize: 10,
  },
  desc: {
    fontSize: 12,
    color: "#666",
  },
  discount: {
    fontSize: 12,
    color: "#666",
    textDecorationLine: "line-through",
  },
  footer: { flexDirection: "row", justifyContent: "space-between" },
  footerLeft: {
    flexDirection: "row",
    gap: 4,
    alignItems: "baseline",
    backgroundColor: "rgba(241, 95, 95, 0.2)",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    flex: 1,
  },
  footerRight: {
    gap: 4,
    alignItems: "center",
    backgroundColor: "rgba(241, 37, 37, 0.93)",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    paddingRight: 8,
    paddingLeft: 24,
  },
});

const data = [
  {
    id: 1,
    title: "瑞幸咖啡",
    desc: "茉莉花拿铁",
    price: 11,
    dot: ".9",
    src: noodles,
  },
  { id: 2, title: "瑞幸咖啡", desc: "茉莉花拿铁", price: 11, src: burger },
  { id: 3, title: "瑞幸咖啡", desc: "茉莉花拿铁", price: 11, src: cheungFun },
  { id: 4, title: "瑞幸咖啡", desc: "茉莉花拿铁", price: 11, src: desert },
  {
    id: 5,
    title: "瑞幸咖啡",
    desc: "茉莉花拿铁",
    price: 11,
    dot: ".9",
    src: milkTea,
  },
  { id: 6, title: "瑞幸咖啡", desc: "茉莉花拿铁", price: 11, src: steamedBun },
  { id: 7, title: "瑞幸咖啡", desc: "茉莉花拿铁", price: 11, src: soybeanMilk },
  { id: 8, title: "瑞幸咖啡", desc: "茉莉花拿铁", price: 11, src: spiceHotPot },
  {
    id: 9,
    title: "这可不是瑞幸",
    desc: "拿什么贴",
    price: 11,
    dot: ".9",
    src: milkTea,
  },
  {
    id: 10,
    title: "这个也不错",
    desc: "拿什么贴",
    price: 11,
    src: steamedBun,
  },
  {
    id: 11,
    title: "这个错了",
    desc: "拿什么贴",
    price: 11,
    src: soybeanMilk,
  },
  {
    id: 12,
    title: "这个对了",
    desc: "拿什么贴",
    price: 11,
    src: spiceHotPot,
  },
];

const Card = ({
  src,
  name = "瑞幸咖啡",
  tag = "爆品一口价",
  content = "双杯 柚C美式-冰/不另外加糖 默认",
  distance = "1.5km",
  price = "¥ 11",
  discount = "¥ 9.00",
  dot = ".9",
  infos = ["已售100万+", "好评率90%"],
  time = "30分钟",
}) => {
  return (
    <View style={styles.card}>
      <Image source={src} style={styles.image} />
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <TagWithWrappingText
          tag={<Text style={styles.tagLabel}>{tag}</Text>}
          content={content}
          contentStyle={styles.content}
        />
        <View style={{ flexDirection: "row", gap: 4 }}>
          {infos.map((item, index) => (
            <Text key={index} style={styles.tag}>
              {item}
            </Text>
          ))}
        </View>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Text style={styles.desc}>{distance}</Text>
          <Text style={styles.desc}>{time}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Price price={price} dot={dot} />
            <Text style={{ fontSize: 12, color: "#f54747ff" }}>到手价</Text>
            <Text style={styles.discount}>{discount}</Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
              抢
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const { width: screenWidth } = Dimensions.get("window");
const Recommend = () => {
  const [visible, setVisible] = useState(false);
  const addressSheetRef = useRef(null);
  const scrollY = useSharedValue(0);
  const onScroll = (e) => {
    const { contentOffset } = e.nativeEvent;
    scrollY.value = contentOffset.y;
  };

  const [height, setHeight] = useState(0);

  const onLayout = (e) => {
    setHeight(e.nativeEvent.layout.height);
  };
  const titleAnimatedStyle = useAnimatedStyle(() => {
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
    const animateHeight = interpolate(
      scrollY.value,
      [20, 60],
      [height, 40],
      Extrapolation.CLAMP
    );
    return {
      height: animateHeight,
    };
  });
  const searchInputAnimatedStyle = useAnimatedStyle(() => {
    // 同时缩小搜索框宽度，与头部按钮对齐
    const width = interpolate(
      scrollY.value,
      [20, 60],
      [screenWidth - 16, screenWidth - 70], // 宽度从 80%→60%
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scrollY.value,
      [20, 60], // 触发区间
      [0, 48], // 透明度从 1→0
      Extrapolation.CLAMP
    );
    return {
      width,
      transform: [
        {
          translateY: -translateX,
        },
        {
          translateX: translateX,
        },
      ],
    };
  });
  return (
    <Layout
      style={{ backgroundColor: "#f5f5f5" }}
      header={{
        title: () => (
          <Animated.View style={[{ flex: 1 }, headerAnimatedStyle]}>
            <View onLayout={onLayout}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <BackButton />
                  <Animated.View style={titleAnimatedStyle}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      百亿补贴
                    </Text>
                  </Animated.View>
                </View>
                <Animated.View style={titleAnimatedStyle}>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <SelectAddress
                      size={14}
                      onPress={() => {
                        setVisible(true);
                      }}
                    />
                    <IconFont name="arrow-right" size={10} />
                  </View>
                </Animated.View>
              </View>
              <Animated.View style={searchInputAnimatedStyle}>
                <SearchInput isFakeInput />
              </Animated.View>
            </View>
          </Animated.View>
        ),
      }}
    >
      <Animated.ScrollView onScroll={onScroll}>
        <View style={{ gap: 12 }}>
          {data.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </View>
      </Animated.ScrollView>

      <AddressSheet
        ref={addressSheetRef}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </Layout>
  );
};
export default Recommend;
