import IconFont from "app/components/common/iconfont";
import Sheet from "app/components/common/sheet";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import src from "../../assets/burger.png";
import SwiperDelete from "app/components/common/swiper-delete";
import CommonCheckbox from "app/components/common/checkbox";

const styles = StyleSheet.create({
  selectAll: {
    fontSize: 16,
    marginRight: 4,
    marginLeft: 4,
  },
  whole: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteText: {
    color: "#646982",
    fontSize: 14,
    marginLeft: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    objectFit: "cover",
  },
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#fff",
  },
  countText: {
    width: 30,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "#FF7622",
  },
  priceBold: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

const Item = ({ title, onDelete }) => {
  return (
    <View style={[styles.whole]}>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <CommonCheckbox />
      </View>
      <Image source={src} style={styles.image} />
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.row}>
          <Text style={styles.price}>
            <Text>$</Text>
            <Text style={styles.priceBold}>9</Text>
            <Text>.9</Text>
          </Text>
          <View style={[styles.row, { gap: 4 }]}>
            <IconFont name="minus" size={14} color="#333" />
            <Text style={styles.countText}>1</Text>
            <IconFont name="plus" size={14} color="#333" />
          </View>
        </View>
      </View>
    </View>
  );
};
const CartSheet = ({ visible, onClose, ref }) => {
  return (
    <Sheet showHeader={false} visible={visible} onClose={onClose} ref={ref}>
      <View style={styles.container}>
        <View style={[styles.row, { marginBottom: 20 }]}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <CommonCheckbox />
            <Text style={styles.selectAll}>全选</Text>
            <Text>（打包费</Text>
            <Text>￥1</Text>
            <Text>）</Text>
          </View>
          <Text>
            <IconFont name="delete" size={14} color="#646982" />
            <Text style={styles.deleteText}>清空购物车</Text>
          </Text>
        </View>
        <SwiperDelete renderItem={({ item }) => <Item {...item} />} />
      </View>
    </Sheet>
  );
};

export default CartSheet;
