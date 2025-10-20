import IconFont from "app/components/common/iconfont";
import Sheet from "app/components/common/sheet";
import Checkbox from "expo-checkbox";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import src from "../../assets/burger.png";
import SwiperDelete from "app/components/common/swiper-delete";

const styles = StyleSheet.create({
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#F58D1D",
    borderWidth: 0,
  },
  selectAll: {
    fontSize: 16,
    marginRight: 4,
    marginLeft: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
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
  },
  countText: {
    width: 30,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  },
});

const Item = ({ title, checked, onPress, onDelete }) => {
  return (
    <View
      style={[
        styles.row,
        {
          flexDirection: "row",
          gap: 20,
          backgroundColor: "#fff",
          paddingRight: 16,
        },
      ]}
    >
      <Checkbox
        value={checked}
        onValueChange={onPress}
        color={checked ? "#4630EB" : undefined}
        style={styles.checkbox}
      />
      <Image source={src} style={styles.image} />
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.row}>
          <Text>
            <Text>$</Text>
            <Text>9</Text>
            <Text>.9</Text>
          </Text>
          <View style={styles.row}>
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
          <Text>
            <Checkbox style={styles.checkbox} />
            <Text style={styles.selectAll}>全选</Text>
            <Text>（打包费</Text>
            <Text>￥1</Text>
            <Text>）</Text>
          </Text>
          <Text>
            <IconFont name="delete" size={14} color="#646982" />
            <Text style={styles.deleteText}>清空购物车</Text>
          </Text>
        </View>
        <View style={{ gap: 32, paddingVertical: 12 }}>
          <SwiperDelete renderItem={({ item }) => <Item {...item} />} />
        </View>
      </View>
    </Sheet>
  );
};

export default CartSheet;
