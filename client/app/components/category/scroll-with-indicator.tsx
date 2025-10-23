import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ScrollWithIndicator = ({ children }) => {
  const scrollRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0); // 滚动容器可见高度
  const [contentWidth, setContentWidth] = useState(0); // 滚动内容总高度
  const scrollX = useSharedValue(0); // 滚动偏移量（共享值，用于动画）

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x; // 实时更新滚动Y轴偏移
    },
  });

  // 3. 计算滑块的动画样式
  const indicatorStyle = useAnimatedStyle(() => {
    const scrollableWidth = Math.max(0, contentWidth - containerWidth);
    const progress = Math.min(1, Math.max(0, scrollX.value / scrollableWidth));
    const indicatorLeft = progress * 21;

    return {
      left: withTiming(indicatorLeft, { duration: 50 }), // 平滑动画
    };
  });

  const handleContainerLayout = (e) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  const handleContentLayout = (e) => {
    setContentWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16} // 16ms 触发一次，确保流畅
        onLayout={handleContainerLayout} // 获取容器高度
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {/* 滚动内容（包裹用户传入的子元素） */}
        <View onLayout={handleContentLayout}>{children}</View>
      </Animated.ScrollView>
      {/* 底部滚动指示器（滑块容器） */}
      <View style={styles.indicatorContainer}>
        {/* 跟随滚动的滑块 */}
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 12,
    padding: 12,
  },
  // 滚动指示器容器（底部细条）
  indicatorContainer: {
    width: 24,
    height: 4,
    backgroundColor: "#e0e0e0",
    marginTop: 4,
    borderRadius: 2,
    position: "relative",
  },
  // 滑块样式
  indicator: {
    height: 4,
    width: 6,
    backgroundColor: "#2196f3", // 滑块颜色
    borderRadius: 2, // 圆角
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default ScrollWithIndicator;
