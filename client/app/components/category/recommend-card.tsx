import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import IconFont from "../common/iconfont";
import image from "../../../assets/burger.png";
import thunder from "../../../assets/svg/thunder.svg";
const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 10,
  },
  thunder: {
    width: 20,
    height: 22,
    position: "absolute",
    left: 24,
    zIndex: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "#8e4343ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 12,
    color: "rgba(162, 102, 38, 0.86)",
    marginTop: 4,
  },
  desc: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ee5252ff",
  },
  dot: {
    color: "#ee5252ff",
    fontSize: 10,
    fontWeight: "bold",
  },
  discount: {
    color: "#fff",
    fontSize: 10,
  },
  left: {
    paddingLeft: 4,
    alignItems: "baseline",
    justifyContent: "center",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    flexDirection: "row",
    height: 18,
    paddingRight: 4,
  },
  right: {
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: "#FF4444",
    height: 18,
    flex: 1,
  },
});

const data = [
  { title: "瑞幸咖啡", desc: "茉莉花拿铁", price: 11, dot: ".9" },
  { title: "瑞幸咖啡", desc: "茉莉花拿铁", price: 11 },
  { title: "瑞幸咖啡", desc: "茉莉花拿铁", price: 11 },
  { title: "瑞幸咖啡", desc: "茉莉花拿铁", price: 11 },
];
const Card = ({
  title,
  src = image,
  desc,
  price,
  dot = ".9",
  discount = "补46",
}) => {
  return (
    <View>
      <Image source={src} style={styles.image} />
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text numberOfLines={1} style={styles.desc}>
        {desc}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          marginTop: 4,
          flex: 1,
        }}
      >
        <LinearGradient
          colors={["#f3e7e7c7", "#fff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        >
          <View style={styles.left}>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.dot}>{dot}</Text>
          </View>
        </LinearGradient>

        <Image source={thunder} style={styles.thunder} />
        <View style={styles.right}>
          <Text style={styles.discount}>{discount}</Text>
        </View>
      </View>
    </View>
  );
};
const Recommend = () => {
  return (
    <LinearGradient
      colors={["#f3afaf8a", "#fff"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 0.2 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>甄选爆品</Text>
        <View style={styles.row}>
          <Text style={{ color: "#666", fontSize: 12 }}>更多</Text>
          <IconFont name="arrow-right" size={8} color={"#666"} />
        </View>
      </View>
      <View style={[styles.row, { marginTop: 12 }]}>
        {data.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </View>
    </LinearGradient>
  );
};
export default Recommend;
