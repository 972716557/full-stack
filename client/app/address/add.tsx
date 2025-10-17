import BigButton from "app/components/common/big-button";
import Layout from "app/components/layout/layout";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  input: {
    borderColor: "#ddd",
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  label: {
    width: 80,
    flexShrink: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "#dddddd8a",
    marginVertical: 16,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tip: {
    fontSize: 12,
    marginTop: 4,
    color: "#999",
  },
  tag: {
    backgroundColor: "#f5f5f598",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    maxWidth: 120,
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    flex: 1,
  },
});
const AddressAdd = () => {
  const inset = useSafeAreaInsets();
  const [width, setWidth] = useState(0);
  const onOk = () => {};
  const onLayout = (e) => {
    const { width } = e.nativeEvent.layout;
    setWidth(width);
  };

  return (
    <Layout
      header={{ title: "新增收货地址", style: { paddingHorizontal: 12 } }}
      safeAreaViewProps={{
        edges: ["top"],
      }}
      style={{ backgroundColor: "#f5f5f5", paddingHorizontal: 0 }}
    >
      <ScrollView style={{ flex: 1, paddingHorizontal: 12 }}>
        <View style={{ gap: 24 }}>
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.label}>收货人</Text>
              <TextInput style={styles.input} placeholder="请输入收货人姓名" />
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.label}>手机号</Text>
              <TextInput style={styles.input} placeholder="请输入手机号" />
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.label}>所在小区</Text>
              <TextInput style={styles.input} placeholder="省、市、区" />
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.label}>详细地址</Text>
              <TextInput
                style={styles.input}
                placeholder="小区名、单元号、门牌号"
              />
            </View>
          </View>
          <View style={styles.container} onLayout={onLayout}>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <View>
                <Text style={styles.label}>所在小区</Text>
                <Text style={styles.tip}>提醒：下单时会优先使用该地址</Text>
              </View>
              <Checkbox style={styles.checkbox} />
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.label}>标签</Text>
              <View style={[styles.tagContainer, { width }]}>
                {["家", "公司", "学校", "朋友", "家人", "自定义"].map(
                  (item) => (
                    <Text numberOfLines={1} key={item} style={styles.tag}>
                      {item}
                    </Text>
                  )
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: inset.bottom,
          backgroundColor: "#fff",
        }}
      >
        <BigButton text="保存" onPress={onOk} />
      </View>
    </Layout>
  );
};
export default AddressAdd;
