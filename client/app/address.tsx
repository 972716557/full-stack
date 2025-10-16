import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import IconFont from "./components/common/iconfont";
import { useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import Layout from "./components/layout/layout";
import BigButton from "./components/common/big-button";

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#F0F5FA",
    borderRadius: 16,
    flexDirection: "row",
    gap: 16,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  address: {
    fontSize: 14,
    color: "#91959C",
  },
  contentContainer: {
    padding: 20,
    height: "100%",
  },
  blackOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)", // 黑色半透明（0.6为透明度，可调整）
  },
  tag: {
    backgroundColor: "#F0F5FA",
    paddingHorizontal: 24,
    flex: 0,
    paddingVertical: 16,
    borderRadius: 24,
    color: "#32343E",
  },
  tagSelected: {
    backgroundColor: "#F58D1D",
    color: "#fff",
  },
  label: {
    color: "#32343E",
    fontSize: 16,
  },
});

const data = [
  {
    title: "HOME",
    icon: "home",
    color: "#2790C3",
  },
  {
    title: "WORK",
    icon: "work",
    color: "#A03BB1",
  },
];
const Address = () => {
  const [parentWidth, setParentWidth] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("Home");

  // 打开抽屉
  const openDrawer = () => {
    setOpen(true);
  };

  const bottomSheetRef = useRef(null);

  const handleSheetChange = (index) => {
    if (index === -1) {
      setOpen(false);
    }
  };

  const renderBackground = ({ style }) =>
    // 可点击的遮罩，点击关闭抽屉
    open && (
      <TouchableOpacity
        style={[style, styles.blackOverlay]} // 结合默认样式和自定义黑色遮罩
        onPress={() => {
          setOpen(false);
          bottomSheetRef.current?.close();
        }} // 点击遮罩关闭抽屉
        activeOpacity={1} // 去除点击透明度变化
      />
    );

  return (
    <Layout header={{ title: "地址" }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ gap: 16, marginTop: 16, flex: 1 }}>
          {data.map(({ title, icon, color }) => (
            <View style={styles.card} key={title}>
              <View style={styles.icon}>
                <IconFont name={icon} color={color} />
              </View>
              <View style={{ gap: 4, flex: 1 }}>
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                  <View>
                    <Text>{title}</Text>
                  </View>
                  <View style={{ gap: 8, flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => {
                        setOpen(true);
                        bottomSheetRef.current?.expand();
                      }}
                    >
                      <IconFont name="edit" color="#FB6D3A" />
                    </TouchableOpacity>
                    <IconFont name="delete" color="#FB6D3A" />
                  </View>
                </View>
                <Text style={styles.address}>123 Main St, Springfield</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <BigButton text="Add new address" onPress={openDrawer} />

      <BottomSheet
        snapPoints={["80%"]}
        onChange={handleSheetChange}
        ref={bottomSheetRef}
        index={open ? 1 : -1}
        enablePanDownToClose={true}
        backdropComponent={renderBackground}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.label}>Label As</Text>
          <ScrollView horizontal>
            <View style={{ gap: 12, marginTop: 12, flexDirection: "row" }}>
              {["Home", "Work", "Other"].map((item) => (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.7}
                  onPress={() => setSelectedTag(item)}
                >
                  <Text
                    key={item}
                    style={
                      selectedTag === item
                        ? [styles.tag, styles.tagSelected]
                        : styles.tag
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <BigButton text="Save Location" />
        </BottomSheetView>
      </BottomSheet>
    </Layout>
  );
};
export default Address;
