import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchInput from "./components/common/search-input";
import Layout from "./components/layout/layout";
import { Image } from "expo-image";
import IconFont from "./components/common/iconfont";
import burger from "../assets/burger.png";
import { Link } from "expo-router";
import HeaderCart from "./components/common/header-cart";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "#32343E",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  buttonGroup: {
    marginTop: 12,
    flexDirection: "row",
    gap: 8,
  },
  card: {
    flexDirection: "row",
    gap: 16,
    padding: 14,
    borderBottomColor: "#EBEBEB",
    borderBottomWidth: 1,
  },
  cardImg: {
    width: 60,
    height: 50,
    borderRadius: 12,
  },
  popularCardImg: {
    width: 120,
    height: 80,
    borderRadius: 12,
    position: "absolute",
    top: 0,
    left: "50%",
    zIndex: 10,
    objectFit: "fill",
    transform: [{ translateX: -60 }],
  },
  popularCardTitle: {
    color: "#32343E",
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 4,
  },
  popularCardContent: {
    position: "absolute",
    bottom: 0,
    height: 100,
    left: 0,
    width: "100%",
    borderRadius: 24,
    padding: 12,
    backgroundColor: "#fff",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowColor: "#646982",
    paddingTop: 50,
    shadowOpacity: 0.25, // 阴影不透明度 (0-1)
    shadowRadius: 2, // 阴影模糊半径
  },
});
const KeywordButton = ({ word, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{word}</Text>
  </TouchableOpacity>
);

const KeyWordCard = ({ source = burger, title, star }) => (
  <View style={styles.card}>
    <Image style={styles.cardImg} source={source} />
    <View>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>{title}</Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <IconFont name="star" color="#FF7622" size={16} />
        <Text style={{ marginLeft: 4 }}>{star}</Text>
      </View>
    </View>
  </View>
);
const PopularCard = ({ source = burger, title, des }) => (
  <View
    style={{
      height: 144,
      width: "46%",
      marginBottom: 16,
      position: "relative",
    }}
  >
    <Image style={styles.popularCardImg} source={source} />
    <View style={styles.popularCardContent}>
      <Text
        style={styles.popularCardTitle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      <Text
        style={{ color: "#646982", fontSize: 14 }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {des}
      </Text>
    </View>
  </View>
);
const Search = () => {
  const onSearch = () => {};
  const onPressKeyword = () => {};
  return (
    <Layout
      header={{
        title: "Search",
        rightNode: <HeaderCart />,
      }}
    >
      <SearchInput
        placeholder={"Search dishes, restaurants"}
        onSearch={onSearch}
      />
      <ScrollView>
        <Text style={[styles.title, { marginTop: 24 }]}>Recent Keywords</Text>
        <ScrollView
          horizontal
          style={{ flexGrow: 0 }}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.buttonGroup}>
            {["burger", "sandwich", "tea", "pizza", "pig", "beef"].map(
              (item) => (
                <KeywordButton
                  key={item}
                  word={item}
                  onPress={onPressKeyword}
                />
              )
            )}
          </View>
        </ScrollView>
        <Text style={[styles.title, { marginTop: 32 }]}>
          Suggested Restaurants
        </Text>
        <View style={{ marginTop: 8 }}>
          {[
            { title: "Pansi Restaurant", star: "4.3" },
            { title: "American Spicy Burger Shop", star: "4.7" },
            {
              title: "Cafenio Coffee Club",
              star: "4.2",
            },
          ].map((item, index) => (
            <KeyWordCard key={index} {...item} />
          ))}
        </View>
        <Text style={[{ marginTop: 32 }, styles.title]}>Popular Fast food</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 16,
            padding: 12,
          }}
        >
          {[
            { title: "european Pizza", des: "Uttora Coffe House" },
            { title: "european Pizza", des: "Cafenio Coffee Club" },
            { title: "Buffalo Pizza", des: "Uttora Coffe House" },
          ].map((item, index) => (
            <PopularCard key={index} {...item} />
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};
export default Search;
