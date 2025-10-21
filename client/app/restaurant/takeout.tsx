import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  TouchableOpacity,
} from "react-native";
import Card from "./takeout-card";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", // 左右布局
    backgroundColor: "#f5f5f5",
  },
  // 左侧分类容器
  leftContainer: {
    width: 100,
    borderRightWidth: 1,
    borderRightColor: "#eee",
    backgroundColor: "#f9f8f8ff",
    flexGrow: 0,
  },
  leftTab: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  leftTabActive: {
    backgroundColor: "#f0f7ff", // 选中项背景色
  },
  leftTabText: {
    fontSize: 14,
    color: "#333",
  },
  leftTabTextActive: {
    color: "#2196f3", // 选中项文字色
    fontWeight: "bold",
  },
  // 右侧内容容器
  rightContainer: {
    flex: 1, // 占剩余宽度
    gap: 40,
  },
  rightSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionDesc: {
    color: "#666",
  },
  banner: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  bannerImg: {
    width: "100%",
    height: 200,
    objectFit: "fill",
    borderRadius: 10,
  },
});

// 模拟数据：左侧分类 + 右侧对应内容
const categories = [
  { id: "1", name: "服饰" },
  { id: "2", name: "电子产品" },
  { id: "3", name: "食品" },
  { id: "4", name: "家居" },
  { id: "5", name: "美妆" },
  { id: "6", name: "图书" },
];

const Scroll = () => {
  // 状态管理
  const [activeIndex, setActiveIndex] = useState(0); // 当前选中的分类索引
  const [sectionPositions, setSectionPositions] = useState<number[]>([]); // 右侧每个区块的顶部y坐标

  // 引用
  const leftScrollRef = useRef<ScrollView>(null); // 左侧tab滚动容器
  const rightScrollRef = useRef<ScrollView>(null); // 右侧内容滚动容器

  const [subTitlePositions, setSubTitlePositions] = useState<
    {
      y: number;
      name: string;
      categoryKey: string;
    }[]
  >([]);

  // 1. 记录右侧每个分类区块的位置（y坐标）
  const handleSectionLayout = (index: number, e: any) => {
    const { y } = e.nativeEvent.layout;
    // 更新对应索引的区块位置
    setSectionPositions((prev) => {
      const newPositions = [...prev];
      newPositions[index] = y;
      return newPositions;
    });
  };

  // 2. 监听右侧内容滚动，同步左侧tab
  const handleRightScroll = (e: any) => {
    const scrollY = e.nativeEvent.contentOffset.y;

    // 找到当前滚动位置对应的分类区块
    for (let i = categories.length - 1; i >= 0; i--) {
      // 当滚动位置超过当前区块的顶部，且（是最后一个区块 或 未超过下一个区块顶部）
      const isInSection =
        scrollY >= (sectionPositions[i] || 0) &&
        (i === categories.length - 1 ||
          scrollY < (sectionPositions[i + 1] || Infinity));

      if (isInSection && activeIndex !== i) {
        setActiveIndex(i);
        // 左侧tab滚动到选中项（确保可见）
        leftScrollRef.current?.scrollTo({
          y: i * 50 - 100, // 50是每个tab高度，-100是为了让选中项居中
          animated: true,
        });
        break;
      }
    }
  };

  // 3. 点击左侧tab，右侧滚动到对应区块
  const handleLeftTabPress = (index: number) => {
    setActiveIndex(index);
    // 滚动到右侧对应区块的顶部
    rightScrollRef.current?.scrollTo({
      y: sectionPositions[index] || 0,
      animated: true,
    });
  };

  // 1. 记录所有小标题的位置（含大分类key，避免跨分类误判）
  const handleSubTitleLayout = (
    categoryKey: string,
    subTitle: string,
    e: LayoutChangeEvent
  ) => {
    const { y } = e.nativeEvent.layout;
    setSubTitlePositions((prev) => {
      // 去重后添加新位置
      const newPositions = prev.filter(
        (item) => !(item.categoryKey === categoryKey && item.name === subTitle)
      );
      newPositions.push({ y, name: subTitle, categoryKey });
      // 按y坐标排序（确保滚动判断正确）
      return newPositions.sort((a, b) => a.y - b.y);
    });
  };

  // 初始渲染时，确保右侧区块位置已记录
  useEffect(() => {
    // 延迟触发一次右侧滚动检查（避免初始位置未记录）
    const timer = setTimeout(() => {
      rightScrollRef.current?.measure((x, y, width, height, pageX, pageY) => {
        handleRightScroll({ nativeEvent: { contentOffset: { y: 0 } } });
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [sectionPositions]);
  return (
    <View style={styles.container}>
      {/* 左侧分类tab */}
      <ScrollView
        style={styles.leftContainer}
        ref={leftScrollRef}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.leftTab,
              activeIndex === index && styles.leftTabActive, // 选中状态样式
            ]}
            onPress={() => handleLeftTabPress(index)}
          >
            <Text
              style={[
                styles.leftTabText,
                activeIndex === index && styles.leftTabTextActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 右侧内容区域 */}
      <ScrollView
        ref={rightScrollRef}
        style={styles.rightContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleRightScroll}
        scrollEventThrottle={16} // 16ms触发一次，确保流畅
      >
        {categories.map((item, index) => (
          <View
            key={item.id}
            style={[styles.rightSection]}
            onLayout={(e) => handleSectionLayout(index, e)} // 记录区块位置
          >
            <Text
              onLayout={(e) => handleSubTitleLayout(item.id, item.name, e)}
              style={styles.sectionTitle}
            >
              {item.name}
            </Text>
            {/* </Animated.View> */}
            <View style={{ gap: 24 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <Card key={i} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Scroll;
