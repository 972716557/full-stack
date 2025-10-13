import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

// 模拟列表数据
const initialData = [
  { id: "1", title: "列表项 1" },
  { id: "2", title: "列表项 2" },
  { id: "3", title: "列表项 3" },
  { id: "4", title: "列表项 4" },
];

const SwipeListViewExample = () => {
  const [data, setData] = useState(initialData);

  // 1. 渲染列表项（正常显示的内容）
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  // 2. 渲染左滑时显示的隐藏按钮（右侧删除按钮）
  const renderHiddenItem = ({ item }, rowMap) => (
    <View style={styles.hiddenContainer}>
      {/* 删除按钮 */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id, rowMap)}
      >
        <Text style={styles.deleteText}>删除</Text>
      </TouchableOpacity>
    </View>
  );

  // 3. 处理删除逻辑
  const handleDelete = (id, rowMap) => {
    // 关闭当前滑动的项（可选，删除前先收起）
    rowMap[id]?.closeRow();
    // 从数据源中移除
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <SwipeListView
      // 数据源
      data={data}
      // 渲染正常列表项
      renderItem={renderItem}
      // 渲染左滑显示的隐藏项
      renderHiddenItem={renderHiddenItem}
      // 左滑距离（负值表示向左滑动）
      rightOpenValue={-80} // 滑动80px显示完整删除按钮
      // 列表项key
      keyExtractor={(item) => item.id}
      // 滑动时的背景色
      backgroundColor="#f5f5f5"
      // 列表容器样式
      style={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listItem: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: "white",
    justifyContent: "center",
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  // 隐藏项容器（左滑时显示）
  hiddenContainer: {
    flex: 1,
    flexDirection: "row-reverse", // 按钮靠右显示
  },
  deleteButton: {
    width: 80,
    height: "100%",
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "600",
  },
});

export default SwipeListViewExample;
