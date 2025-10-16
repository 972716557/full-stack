import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import IconFont from "../common/iconfont";
import src from "../../../assets/burger.png";

const style = StyleSheet.create({
  container: {
    gap: 8,
    width: 80,
    flexGrow: 0,
  },
  imgContent: {
    position: "relative",
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 4,
    objectFit: "cover",
  },
  tip: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#FF7622",
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    paddingHorizontal: 4,
    color: "#fff",
    fontSize: 11,
    paddingVertical: 2,
  },
  sale: {
    position: "absolute",
    bottom: 0,
    left: 0,
    color: "#FF7622",
    backgroundColor: "#fcdfcbff",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderBottomLeftRadius: 4,
    fontSize: 11,
    borderTopRightRadius: 4,
  },
  title: {
    fontSize: 14,
  },
  add: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF7622",
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    color: "#FF7622",
    fontWeight: 600,
  },
  initialPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 4,
  },
  priceContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  yuan: {
    fontSize: 12,
    color: "#FF7622",
  },
});
const Dish = ({
  title = "香辣鸡翅好奥好罚恶违法罚微风",
  sale = "月售19",
  price = "6.8",
  img = src,
  tip = "好评",
  initialPrice = "10",
}) => {
  return (
    <View style={style.container}>
      <View style={style.imgContent}>
        <Image style={style.img} source={img} />
        <Text style={style.tip}>{tip}</Text>
        <Text style={style.sale}>{sale}</Text>
      </View>
      <Text numberOfLines={1} style={style.title}>
        {title}
      </Text>
      <View style={style.footer}>
        <View>
          <View style={style.priceContent}>
            <Text style={style.yuan}>¥</Text>
            <Text style={style.price}>{price}</Text>
          </View>
          <Text style={style.initialPrice}>¥{initialPrice}</Text>
        </View>
        <View style={style.add}>
          <IconFont name="plus" size={10} color="#fff" />
        </View>
      </View>
    </View>
  );
};

export default Dish;
