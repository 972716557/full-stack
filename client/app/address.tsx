import { View, Text, ScrollView, StyleSheet } from "react-native";
import Layout from "./components/layout/layout";
import SearchInput from "./components/common/search-input";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconFont from "./components/common/iconfont";
import { AddressCard } from "./components/common/address-sheet";
import { useState } from "react";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 18,
  },
  desc: {
    fontSize: 14,
    color: "#666",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  location: {
    color: "#4355f1ff",
    fontSize: 14,
  },
});

const data = [
  {
    name: "张三",
    phone: "12345678901",
    province: "广东",
    city: "深圳市",
    district: "宝安区",
    street: "宝安大道中金大厦",
    tag: "家",
    isDefault: true,
  },
  {
    name: "张三",
    phone: "12345678901",
    province: "广东",
    city: "深圳市",
    district: "宝安区",
    street: "宝安大道中金大厦",
    tag: "家",
    isDefault: true,
  },
  {
    name: "张三",
    phone: "12345678901",
    province: "广东",
    city: "深圳市",
    district: "宝安区",
    street: "宝安大道中金大厦",
    tag: "家",
    isDefault: true,
  },
  {
    name: "张三",
    phone: "12345678901",
    province: "广东",
    city: "深圳市",
    district: "宝安区",
    street: "宝安大道中金大厦",
    tag: "家",
    isDefault: true,
  },
  {
    name: "李世明",
    phone: "12345678901",
    province: "广东",
    city: "深圳",
    district: "宝安",
    street: "宝安大道中金大厦",
    tag: "家",
    isDefault: true,
  },
  {
    name: "李世明",
    phone: "12345678901",
    province: "广东",
    city: "深圳",
    district: "宝安",
    street: "宝安大道",
    tag: "家",
    isDefault: true,
  },
  {
    name: "李世明",
    phone: "12345678901",
    province: "广东",
    city: "深圳",
    district: "宝安",
    street: "宝安大道",
    tag: "家",
    isDefault: true,
  },
];

const Address = () => {
  const inset = useSafeAreaInsets();
  const [isShowAll, setIsShowAll] = useState(false);

  const onPress = () => {
    setIsShowAll(!isShowAll);
  };
  return (
    <Layout
      safeAreaViewProps={{ edges: ["left", "right"] }}
      header={{
        title: "选择地址",
        rightNode: <Text>新建地址</Text>,
        style: {
          backgroundColor: "#fff",
          paddingTop: inset.top,
          paddingHorizontal: 8,
        },
      }}
      style={{ backgroundColor: "#f2f3f5", paddingHorizontal: 0 }}
    >
      <ScrollView style={{ paddingHorizontal: 8 }}>
        <View style={{ gap: 12, paddingBottom: inset.bottom }}>
          <SearchInput
            placeholder="搜索小区/写字楼/学校等"
            style={{ backgroundColor: "#fff", borderRadius: 8 }}
          />
          <View style={[styles.card, styles.row]}>
            <View style={{ gap: 8 }}>
              <Text style={styles.desc}>当前使用位置</Text>
              <Text style={styles.bold}>建造一局</Text>
            </View>
            <View style={styles.row}>
              <IconFont name="location" size={14} color="#4355f1ff" />
              <Text style={styles.location}>重新定位</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 2 }}>
            <IconFont name="home" size={15} />
            <Text style={[styles.desc, { fontSize: 15 }]}>我的收货地址</Text>
          </View>
          {(isShowAll ? data : data.slice(0, 5)).map((item, index) =>
            index === (isShowAll ? data.length - 1 : 4) ? (
              <View key={index}>
                <AddressCard
                  {...item}
                  key={index}
                  style={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                />
                <View
                  style={{
                    padding: 12,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    borderTopColor: "#eee",
                    borderTopWidth: 1,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{ color: "#666", fontSize: 12 }}
                    onPress={onPress}
                  >
                    {isShowAll ? "收起" : "展开"}收货地址
                  </Text>
                  <IconFont
                    name={isShowAll ? "arrow-up" : "arrow-down"}
                    size={12}
                    color="#666"
                  />
                </View>
              </View>
            ) : (
              <AddressCard {...item} key={index} />
            )
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};
export default Address;
