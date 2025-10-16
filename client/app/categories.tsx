import Layout from "./components/layout/layout";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Modal,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import RNPickerSelect from "react-native-picker-select";
import SelectDropdown from "react-native-select-dropdown";
import PopularCard from "./components/popular-card";
import FoodOrderCard from "./components/restaurant/food-order-card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RestaurantCard from "./components/restaurant/restaurant-card";
import { useState } from "react";
import IconFont from "./components/common/iconfont";
import CommonModal from "./components/common/modal";
import ButtonGroup from "./components/common/button-group";
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  columnWrapper: {
    justifyContent: "space-between", // 列之间均匀分布
    marginBottom: 16, // 行之间的间距
    gap: 16,
  },
  dropdownButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ECF0F4",
  },
  dropdownButtonTxtStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dropdownMenuStyle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8, // Android 阴影
  },
  dropdownMenuRowStyle: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  dropdownItemTxtStyle: {
    fontSize: 15,
    color: "#4B5563",
    marginLeft: 8, // 与图标保持距离
  },
  rightNode: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  label: {
    fontSize: 16,
    color: "#32343E",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
});

const Category = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const emojisWithIcons = [
    { title: "happy", icon: "emoticon-happy-outline" },
    { title: "cool", icon: "emoticon-cool-outline" },
    { title: "lol", icon: "emoticon-lol-outline" },
    { title: "sad", icon: "emoticon-sad-outline" },
    { title: "cry", icon: "emoticon-cry-outline" },
    { title: "angry", icon: "emoticon-angry-outline" },
    { title: "confused", icon: "emoticon-confused-outline" },
    { title: "excited", icon: "emoticon-excited-outline" },
    { title: "kiss", icon: "emoticon-kiss-outline" },
    { title: "devil", icon: "emoticon-devil-outline" },
    { title: "dead", icon: "emoticon-dead-outline" },
    { title: "wink", icon: "emoticon-wink-outline" },
    { title: "sick", icon: "emoticon-sick-outline" },
    { title: "frown", icon: "emoticon-frown-outline" },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Layout
      header={{
        rightNode: (
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={[styles.rightNode, { backgroundColor: "#121223" }]}>
              <IconFont name="search" color="#fff" />
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <View style={[styles.rightNode, { backgroundColor: "#ECF0F4" }]}>
                <IconFont name="filter" />
              </View>
            </TouchableOpacity>
          </View>
        ),
        title: (
          <SelectDropdown
            data={emojisWithIcons}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>burger</Text>
                  <IconFont
                    name={isOpened ? "arrow-up" : "arrow-down"}
                    size={16}
                    color="#F58D1D"
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={[
                    styles.dropdownMenuRowStyle,
                    {
                      ...(isSelected && { backgroundColor: "#D2D9DF" }),
                    },
                  ]}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        ),
      }}
      style={{ paddingBottom: 0 }}
    >
      <View style={styles.container}>
        <GestureHandlerRootView>
          <FlatList
            contentContainerStyle={{
              padding: 10,
              backgroundColor: "white",
              gap: 24,
            }}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            // 滚动事件触发频率（16ms/次，保证流畅）
            scrollEventThrottle={16}
            data={[{ id: 11 }, { id: 2 }, { id: 3 }, { id: 4 }]}
            renderItem={({ item }) => <RestaurantCard />}
            keyExtractor={(item) => item.id}
            // 可视区域渲染优化：指定列表项高度（已知高度时添加，提升性能）
            getItemLayout={(data, index) => ({
              length: 120, // 与itemContainer高度一致
              offset: 120 * index,
              index,
            })}
            ListHeaderComponent={
              <>
                <Text style={styles.title}>Popular Burgers</Text>
                <View style={styles.container}>
                  {[{ id: 11 }, { id: 2 }, { id: 3 }, { id: 4 }].map((item) => (
                    <View
                      key={item.id}
                      style={{ width: "48%", marginBottom: 12 }}
                    >
                      <FoodOrderCard />
                    </View>
                  ))}
                </View>
                <Text style={styles.title}>Open Restaurants</Text>
              </>
            }
          />
        </GestureHandlerRootView>
      </View>
      <CommonModal
        animationType="slide" // 动画类型：slide/fade/none
        transparent={true} // 背景透明
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <View style={{ gap: 32 }}>
          <View>
            <Text style={styles.label}>Offers</Text>
            <View style={styles.row}>
              {["Delivery", "Pickup", "Dine-in", "Takeaway"].map(
                (item, index) => (
                  <ButtonGroup.Item key={item} text={item} />
                )
              )}
            </View>
          </View>
          <View>
            <Text style={styles.label}>Deliver Time</Text>
            <View style={styles.row}>
              {["Cash", "Credit Card", "PayPal", "Apple Pay"].map(
                (item, index) => (
                  <ButtonGroup.Item key={item} text={item} />
                )
              )}
            </View>
          </View>
          <View>
            <Text style={styles.label}>Pricing</Text>
            <View style={styles.row}>
              {["Cash", "Credit Card", "PayPal", "Apple Pay"].map(
                (item, index) => (
                  <ButtonGroup.Item key={item} text={item} />
                )
              )}
            </View>
          </View>

          <View>
            <Text style={styles.label}>Rating</Text>
            <View style={styles.row}>
              {["Cash", "Credit Card", "PayPal", "Apple Pay"].map(
                (item, index) => (
                  <ButtonGroup.Item key={item} text={item} />
                )
              )}
            </View>
          </View>
        </View>
      </CommonModal>
    </Layout>
  );
};

export default Category;
