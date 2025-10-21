import IconFont from "app/components/common/iconfont";
import Sheet from "app/components/common/sheet";
import TagWithWrappingText from "app/components/common/tag-with-wrapping-text";
import { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import img from "../../assets/burger.png";
import CommonCheckbox from "app/components/common/checkbox";
import BigButton from "app/components/common/big-button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f5",
    padding: 12,
    height: "100%",
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  desc: {
    color: "#666",
  },
  selectAddress: {
    color: "#FF7622",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  tagLabel: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginTop: 6,
  },
  name: {
    fontSize: 14,
    color: "#333",
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  shop: {
    fontSize: 10,
    color: "#999",
  },
  dish: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    maxWidth: "60%",
  },
  discount: {
    fontSize: 10,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 4,
  },
  price: {
    fontSize: 12,
    color: "#999",
    fontWeight: "bold",
  },
  realPrice: {
    fontSize: 12,
    color: "#FF7622",
  },
  footer: {},
});

const PaymentSheet = ({ ref, visible, onClose, zIndex }) => {
  const [selectedInfo, setSelectedInfo] = useState({});
  return (
    <Sheet
      ref={ref}
      visible={visible}
      onClose={onClose}
      showHeader={false}
      zIndex={zIndex}
      enablePanDownToClose
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.card}>
            {selectedInfo ? (
              <>
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                  <TagWithWrappingText
                    contentStyle={styles.title}
                    tag={<Text style={styles.tagLabel}>家</Text>}
                    content={"和丰路与玉珠路交叉路口南侧"}
                  />
                  <IconFont name="arrow-right" size={12} color="#A0A5BA" />
                </View>
                <View style={[styles.row, styles.info]}>
                  <Text style={styles.name}>王苏</Text>
                  <Text style={styles.desc}>18888888888</Text>
                </View>
              </>
            ) : (
              <View style={styles.row}>
                <Text style={styles.selectAddress}>请选择收货地址</Text>
                <IconFont name="arrow-right" size={12} color="#A0A5BA" />
              </View>
            )}
          </View>
          <View style={styles.card}>
            <Text style={styles.shop}>塔斯汀·中国汉堡（枫信科技园店）</Text>
            <View style={[styles.row, { marginTop: 12, gap: 8 }]}>
              <Image style={styles.img} source={img} />
              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View
                  style={[
                    styles.row,
                    { flex: 1, justifyContent: "space-between" },
                  ]}
                >
                  <Text numberOfLines={1} style={styles.dish}>
                    香辣鸡腿中国汉堡+盐酥鸡米花+薯条+可乐
                  </Text>
                  <View style={[styles.row, { flexShrink: 0 }]}>
                    <Text style={styles.discount}>￥56</Text>
                    <Text style={styles.price}>￥41.9</Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.row,
                    { flex: 1, justifyContent: "space-between" },
                  ]}
                >
                  <Text style={styles.discount}>x1</Text>
                  <Text style={styles.realPrice}>优惠后￥12.9</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.card, { gap: 12 }]}>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text>商品金额</Text>
              <Text>￥41.9</Text>
            </View>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text>打包费</Text>
              <Text>￥1</Text>
            </View>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text>运费</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  gap: 2,
                }}
              >
                <Text style={{ color: "red", fontSize: 12 }}>已免运费</Text>
                <Text
                  style={{
                    color: "#999",
                    fontSize: 10,
                    textDecorationLine: "line-through",
                  }}
                >
                  ￥4.5
                </Text>
                <Text>￥0</Text>
              </View>
            </View>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text>优惠券</Text>
              <Text>-￥1</Text>
            </View>
          </View>
          <View style={[styles.card, { gap: 8 }]}>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text>
                <IconFont name="wechat" />
                <Text style={{ marginLeft: 4 }}>微信支付</Text>
              </Text>
              <CommonCheckbox />
            </View>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text>
                <IconFont name="alipay" />
                <Text style={{ marginLeft: 4 }}>阿里支付</Text>
              </Text>
              <CommonCheckbox />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <BigButton text="支付" />
      </View>
    </Sheet>
  );
};
export default PaymentSheet;
