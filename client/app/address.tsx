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
import { useState } from "react";
import { Drawer } from "react-native-drawer-layout";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    height: "100%",
    gap: 20,
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
    bottom: 40,
    left: 20,
  },
  buttonLabel: {
    color: "#fff",
    textAlign: "center",
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
  // 父元素布局完成后触发，获取其宽度
  const handleParentLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width); // 更新父元素宽度
  };

  // 打开抽屉
  const openDrawer = () => {
    setOpen(true);
  };

  // 关闭抽屉
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#fff", position: "relative" }}
        onLayout={handleParentLayout}
      >
        <Drawer
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          renderDrawerContent={() => {
            return <Text>Drawer content</Text>;
          }}
        >
          <ScrollView style={styles.container}>
            <Header title="My Address" />
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
          <TouchableOpacity onPress={openDrawer}>
            <View style={[styles.button, { width: parentWidth - 40 }]}>
              <Text style={styles.buttonLabel}>Add new address</Text>
            </View>
          </TouchableOpacity>
        </Drawer>
      </SafeAreaView>
    </>
  );
};
export default Address;
