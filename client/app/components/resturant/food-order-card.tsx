import { Image } from "expo-image";
import { View, StyleSheet, Text } from "react-native";
import src from "../../../assets/burger.png";
import IconFont from "../common/iconfont";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    position: "relative",
  },
  img: {
    borderRadius: 10,
    width: 110,
    height: 80,
    position: "absolute",
    top: 0,
    zIndex: 10,
  },
  content: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 40,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowColor: "#646982",
    shadowOpacity: 0.25, // 阴影不透明度 (0-1)
    shadowRadius: 20, // 阴影模糊半径
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: "#666",
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F58D1D",
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
const FoodOrderCard = () => {
  return (
    <View style={styles.container}>
      <Image source={src} style={styles.img} />
      <View style={styles.content}>
        <Text style={styles.title}>Food Order Card</Text>
        <Text style={styles.desc}>Cafecafachino</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.price}>$40</Text>
          <View style={styles.icon}>
            <IconFont
              name="plus"
              color="#fff"
              size={16}
              style={{ transform: [{ translateX: -1 }] }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default FoodOrderCard;
