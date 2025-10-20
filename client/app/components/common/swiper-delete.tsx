import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import IconFont from "app/components/common/iconfont";
import { SwipeListView } from "react-native-swipe-list-view";

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
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
});

const SwiperDelete = ({ renderItem, ...rest }) => {
  const [data, setData] = useState([
    { id: 1, title: "pizza calzone european pizza calzone european" },
    { id: 2, title: "pizza calzone european  calzone european" },
    { id: 3, title: "pizza calzone european pizza  european" },
    { id: 4, title: "pizza calzone european pizza calzone " },
  ]);

  const [number, setNumber] = useState(999);
  const plus = () => {
    setNumber((i) => i + 1);
  };
  const minus = () => {
    setNumber((i) => i - 1);
  };
  const handleDelete = (id, rowMap) => {
    // 关闭当前滑动的项（可选，删除前先收起）
    rowMap[id]?.closeRow();
    // 从数据源中移除
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  // 2. 渲染左滑时显示的隐藏按钮（右侧删除按钮）
  const renderHiddenItem = ({ item }, rowMap) => (
    <View style={styles.hiddenContainer}>
      {/* 删除按钮 */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id, rowMap)}
      >
        <IconFont name="delete" color="#fff" size={18} />
      </TouchableOpacity>
    </View>
  );

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
      style={styles.listContainer}
      contentContainerStyle={{ gap: 20 }}
      {...rest}
    />
  );
};

export default SwiperDelete;
