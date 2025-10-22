import { Image } from "expo-image";
import IconFont from "./components/common/iconfont";
import TagWithWrappingText from "./components/common/tag-with-wrapping-text";
import Layout from "./components/layout/layout";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  Pressable,
} from "react-native";
import img from "../assets/burger.png";
import CommonCheckbox from "./components/common/checkbox";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TakeoutTag from "./components/common/takeout-tag";
import { useRef, useState } from "react";
import AddressSheet from "./components/common/address-sheet";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
  },
  tagLabel: {
    fontSize: 8,
    padding: 2,
    color: "#FF7622",
    borderRadius: 2,
    backgroundColor: "#FFF0E0",
    borderWidth: 1,
    borderColor: "#FFF0E0",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectAddress: {
    fontSize: 12,
    color: "#646982",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#dcd7d73c",
    marginVertical: 20,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  price: {
    fontSize: 16,
    color: "#ee5252ff",
    fontWeight: "bold",
  },
  desc: {
    fontSize: 13,
    color: "#333",
  },
  sub: {
    fontSize: 12,
    color: "#999",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 12,
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: -12,
  },
  button: {
    backgroundColor: "#FF7622",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 4,
  },
});

const data = [
  { title: "商品金额", value: "￥10.00" },
  {
    title: "配送费",
    value: "￥5.00",
  },
  { title: "运费优惠", value: "￥-5.00", isDiscount: true },
  { title: "打包费", value: "￥5.00" },
  { title: "优惠券", value: "￥-5.00", isDiscount: true, showArrow: true },
];
const Payment = () => {
  const inset = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <Layout
      header={{ title: "确认订单" }}
      style={{ backgroundColor: "#F2F3F5" }}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ gap: 12 }}>
          <View style={styles.card}>
            <TagWithWrappingText
              contentStyle={styles.title}
              content="深圳工商银行大厦"
              tag={<Text style={styles.tagLabel}>地址</Text>}
            />
            <Pressable
              onPress={() => {
                setVisible(true);
                ref.current.expand();
              }}
            >
              <View
                style={[
                  styles.row,
                  {
                    backgroundColor: "#dcd7d73c",
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    borderRadius: 4,
                    marginTop: 8,
                  },
                ]}
              >
                <Text style={styles.selectAddress}>选择其他收货地址</Text>
                <IconFont name="arrow-right" color="#646982" size={12} />
              </View>
            </Pressable>

            <View style={styles.divider} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "nowrap",
                marginBottom: 16,
              }}
            >
              <TakeoutTag style={{ marginRight: 4 }} />
              <Text style={{ fontSize: 13 }}>
                塔斯汀·中国汉堡（枫叶信息科技园店）
              </Text>
            </View>
            <View
              style={[
                styles.row,
                {
                  gap: 8,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                },
              ]}
            >
              <Image source={img} style={styles.img} />
              <View
                style={{
                  flex: 1,
                  gap: 8,
                }}
              >
                <View>
                  <Text numberOfLines={1} style={styles.title}>
                    香辣鸡腿中国汉堡+盐酥鸡米花+塔塔鸡翅+可怜hang+1份薯条+
                  </Text>
                </View>
                <View style={styles.row}>
                  <View
                    style={{ flexDirection: "row", alignItems: "baseline" }}
                  >
                    <Text style={{ fontSize: 8, color: "#ee5252ff" }}>¥</Text>
                    <Text style={styles.price}>12</Text>
                    <Text
                      style={{
                        color: "#ee5252ff",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      .0
                    </Text>
                  </View>
                  <Text style={{ fontSize: 10 }}>X1</Text>
                </View>
              </View>
            </View>
            <View style={{ gap: 16, marginTop: 12 }}>
              <View style={styles.row}>
                <Text style={styles.desc}>配送</Text>
                <View>
                  <View style={[styles.row, { justifyContent: "flex-end" }]}>
                    <Text style={styles.desc}>立即送出</Text>
                    <IconFont name="arrow-right" size={12} color="#999" />
                  </View>
                  <Text
                    style={{
                      color: "red",
                      marginTop: 4,
                      marginRight: 12,
                      fontSize: 12,
                    }}
                  >
                    预计 1-2 小时送达
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.desc}>如遇缺货</Text>
                <View style={styles.row}>
                  <Text style={styles.desc}>缺货时与我电话沟通</Text>
                  <IconFont name="arrow-right" size={12} color="#999" />
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.desc}>餐具数量</Text>
                <View style={styles.row}>
                  <Text style={styles.desc}>商家按餐量提供</Text>
                  <IconFont name="arrow-right" size={12} color="#999" />
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.desc}>
                  备注
                  <Text>
                    <Text style={styles.sub}>（一次备注，多次使用）</Text>
                  </Text>
                </Text>
                <View style={styles.row}>
                  <Text style={styles.sub}>请输入口味偏好等要求</Text>
                  <IconFont name="arrow-right" size={12} color="#999" />
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.card, { gap: 12 }]}>
            {data.map((item) => (
              <View key={item.title} style={styles.row}>
                <Text style={styles.desc}>{item.title}</Text>
                <View style={styles.row}>
                  <Text style={[item.isDiscount && { color: "red" }]}>
                    {item.value}
                  </Text>
                  {item.showArrow ? (
                    <IconFont name="arrow-right" size={10} color="#999" />
                  ) : (
                    <View style={{ width: 12 }}></View>
                  )}
                </View>
              </View>
            ))}
            <View style={[styles.divider, { marginVertical: 6 }]}></View>
            <View
              style={{
                justifyContent: "flex-end",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.title}>合计：</Text>
              <Text style={{ color: "red" }}>￥13.90</Text>
            </View>
          </View>
          <View style={[styles.card, { gap: 8 }]}>
            <View style={styles.row}>
              <View style={[styles.row, { alignItems: "center", gap: 8 }]}>
                <IconFont name="wechat" />
                <Text>微信支付</Text>
              </View>
              <CommonCheckbox />
            </View>
            <View style={[styles.row]}>
              <View style={[styles.row, { alignItems: "center", gap: 8 }]}>
                <IconFont name="alipay" />
                <Text>支付宝</Text>
              </View>
              <CommonCheckbox />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          styles.footer,
          { marginBottom: -inset.bottom, paddingBottom: inset.bottom + 16 },
        ]}
      >
        <View style={[styles.row, { alignItems: "baseline" }]}>
          <Text style={[styles.price, { fontSize: 16, fontWeight: "bold" }]}>
            ￥
          </Text>
          <Text style={[styles.price, { fontSize: 20, fontWeight: "bold" }]}>
            13
          </Text>
          <Text style={[styles.price, { fontSize: 14, fontWeight: "bold" }]}>
            .90
          </Text>
        </View>
        <View style={styles.button}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>立即支付</Text>
        </View>
      </View>
      <AddressSheet
        ref={ref}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </Layout>
  );
};
export default Payment;
