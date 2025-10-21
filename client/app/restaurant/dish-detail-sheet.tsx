import Sheet from "app/components/common/sheet";
import { Image } from "expo-image";
import { View, StyleSheet, Pressable, Text, Modal } from "react-native";
import src from "../../assets/burger.png";
import IconFont from "app/components/common/iconfont";
import { use, useState } from "react";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 350,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2a282893",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#f13434ff",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  unit: {
    fontSize: 8,
    color: "#fff",
  },
  price: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  discount: {
    fontSize: 11,
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 2,
    color: "#f13434ff",
    fontWeight: "bold",
  },
  desc: {
    color: "#fff",
    fontSize: 13,
  },
});
const DishDetailSheet = ({ ref, visible, onClose, zIndex }) => {
  const onPress = () => {
    onClose();
    ref.current.close();
  };

  const [isFullScreen, setIsFullScreen] = useState(false);
  return (
    <Sheet
      ref={ref}
      visible={visible}
      onClose={onClose}
      showHeader={false}
      zIndex={zIndex}
    >
      <View style={styles.container}>
        <View style={{ position: "relative" }}>
          <Image source={src} style={styles.image} />
          <View
            style={{
              position: "absolute",
              top: 4,
              left: 8,
              right: 8,
              bottom: 0,
            }}
          >
            <View style={styles.row}>
              <Pressable onPress={onPress}>
                <View style={styles.icon}>
                  <IconFont name="arrow-down" size={20} color="white" />
                </View>
              </Pressable>

              <View style={{ gap: 8, flexDirection: "row" }}>
                <View style={styles.icon}>
                  <IconFont name="star" size={20} color="white" />
                </View>
                <View style={styles.icon}>
                  <IconFont name="more" size={20} color="white" />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={styles.unit}>￥</Text>
              <Text style={styles.price}>7.8</Text>
            </View>
            <Text style={styles.discount}>补贴价 已补￥7.1</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              gap: 16,
              marginTop: 8,
            }}
          >
            <Text style={styles.desc}>￥15</Text>
            <Text style={styles.desc}>日常价</Text>
            <Text style={styles.desc}>已售500万+</Text>
          </View>
        </View>
      </View>
      <Modal
        visible={isFullScreen}
        onRequestClose={() => setIsFullScreen(false)}
      >
        <Image
          source={src}
          style={styles.fullScreenImage}
          contentFit="contain"
        />
      </Modal>
    </Sheet>
  );
};
export default DishDetailSheet;
