import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";

// 获取屏幕高度（用于动画位置计算）
const { height: screenHeight } = Dimensions.get("window");

// 从下往上切换的动画组件
const SlideUpSwitcher = ({ children }) => {
  // 1. 状态管理：当前显示的索引、是否正在动画
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 2. 动画共享值：控制新旧元素的位置和透明度
  const oldElementY = useSharedValue(0); // 旧元素的Y轴位置
  const newElementY = useSharedValue(screenHeight); // 新元素初始在屏幕底部
  const newElementOpacity = useSharedValue(0); // 新元素透明度（可选）

  // 3. 计算下一个要显示的索引（循环切换）
  const getNextIndex = useCallback(() => {
    return (currentIndex + 1) % React.Children.count(children);
  }, [currentIndex, children]);

  // 4. 触发切换动画
  const handleSwitch = useCallback(() => {
    if (isAnimating) return; // 避免重复触发
    setIsAnimating(true);

    const nextIndex = getNextIndex();

    // 旧元素动画：向上滑出屏幕
    oldElementY.value = withTiming(-screenHeight, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    });

    // 新元素动画：延迟少量时间（避免重叠生硬），从底部滑入 + 淡入
    newElementY.value = withSequence(
      withDelay(
        50,
        withTiming(0, { duration: 300, easing: Easing.out(Easing.quad) })
      )
    );
    newElementOpacity.value = withSequence(
      withDelay(50, withTiming(1, { duration: 300 }))
    );

    // 动画结束后：更新当前索引，重置动画值
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      oldElementY.value = 0; // 重置旧元素位置（下次作为旧元素时使用）
      newElementY.value = screenHeight; // 重置新元素位置
      newElementOpacity.value = 0;
      setIsAnimating(false);
    }, 350); // 与动画总时长一致（300+50）
  }, [isAnimating, getNextIndex]);

  // 5. 旧元素的动画样式（当前显示的元素）
  const oldElementStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: oldElementY.value }],
  }));

  // 6. 新元素的动画样式（即将显示的元素）
  const newElementStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: newElementY.value }],
    opacity: newElementOpacity.value,
  }));

  // 所有子元素列表
  const childrenList = React.Children.toArray(children);
  // 当前显示的元素
  const currentChild = childrenList[currentIndex];
  // 即将显示的元素
  const nextChild = childrenList[getNextIndex()];

  return (
    <View style={styles.container}>
      {/* 旧元素（当前显示的内容） */}
      <Animated.View style={[styles.elementContainer, oldElementStyle]}>
        {currentChild}
      </Animated.View>

      {/* 新元素（即将显示的内容，动画期间叠加显示） */}
      {isAnimating && (
        <Animated.View style={[styles.elementContainer, newElementStyle]}>
          {nextChild}
        </Animated.View>
      )}

      {/* 切换按钮（触发动画） */}
      <TouchableOpacity style={styles.switchButton} onPress={handleSwitch}>
        <Text style={styles.buttonText}>切换内容</Text>
      </TouchableOpacity>
    </View>
  );
};

// 样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // 父容器相对定位，作为子元素的定位参考
    backgroundColor: "#f5f5f5",
  },
  // 元素容器（绝对定位，确保新旧元素重叠）
  elementContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  // 切换按钮
  switchButton: {
    position: "absolute",
    bottom: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#2196f3",
    borderRadius: 6,
    zIndex: 10, // 确保按钮在元素上方
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  content: {
    width: "80%",
    height: "60%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
});

// 使用示例
const App = () => {
  return (
    <SlideUpSwitcher>
      {/* 第一个内容 */}
      <View style={[styles.content, { backgroundColor: "#ff9500" }]}>
        <Text style={styles.contentText}>内容 1</Text>
      </View>

      {/* 第二个内容 */}
      <View style={[styles.content, { backgroundColor: "#4cd964" }]}>
        <Text style={styles.contentText}>内容 2</Text>
      </View>

      {/* 第三个内容 */}
      <View style={[styles.content, { backgroundColor: "#5856d6" }]}>
        <Text style={styles.contentText}>内容 3</Text>
      </View>
    </SlideUpSwitcher>
  );
};

export default App;
