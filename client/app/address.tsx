import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/header";
import IconFont from "./components/iconfont";
import { useRef, useState } from "react";
import { Drawer } from "react-native-drawer-layout";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { GestureHandlerRootView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    height: "100%",
    gap: 20,
    zIndex: 0,
    flex: 1,
    position: "relative",
  },
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
  button: {
    backgroundColor: "#FF7622",
    borderRadius: 12,
    padding: 20,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: 500,
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  buttonLabel: {
    color: "#fff",
    textAlign: "center",
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
  // 父元素布局完成后触发，获取其宽度
  const handleParentLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width); // 更新父元素宽度
  };

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
        onLayout={handleParentLayout}
      >
        <View style={styles.container}>
          <Header title="My Address" />
          <ScrollView style={{ flex: 1 }}>
            <View style={{ gap: 16, marginTop: 16, flex: 1 }}>
              {data.map(({ title, icon, color }) => (
                <View style={styles.card} key={title}>
                  <View style={styles.icon}>
                    <IconFont name={icon} color={color} />
                  </View>
                  <View style={{ gap: 4, flex: 1 }}>
                    <View
                      style={[styles.row, { justifyContent: "space-between" }]}
                    >
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
          <View style={[styles.button, { width: parentWidth - 40 }]}>
            <TouchableOpacity onPress={openDrawer}>
              <Text style={styles.buttonLabel}>Add new address</Text>
            </TouchableOpacity>
          </View>
        </View>
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
            <View
              style={[styles.button, { width: parentWidth - 40, bottom: 40 }]}
            >
              <TouchableOpacity onPress={openDrawer}>
                <Text style={styles.buttonLabel}>Save Location</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
export default Address;
