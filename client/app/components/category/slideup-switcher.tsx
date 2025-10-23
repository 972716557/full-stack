import React, { useState, useCallback, useEffect, useMemo, use } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { runOnJS, scheduleOnRN } from "react-native-worklets";

// 从下往上切换的动画组件
const SlideUpSwitcher = ({ data, singleGroup = 4, renderItem }) => {
  // 1. 状态管理：当前显示的索引、是否正在动画
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const oldElementRotate = useSharedValue(0); // 旧元素的Y轴位置
  const oldElementOpacity = useSharedValue(1); // 新元素透明度（可选）

  const newElementY = useSharedValue(90); // 新元素初始在屏幕底部
  const newElementOpacity = useSharedValue(0); // 新元素透明度（可选）

  // 3. 计算下一个要显示的索引（循环切换）
  const getNextIndex = () => {
    return (currentIndex + 1) % Math.ceil(data.length / singleGroup);
  };

  // 4. 触发切换动画
  const handleSwitch = () => {
    if (isAnimating) return; // 避免重复触发
    setIsAnimating(true);

    const nextIndex = getNextIndex();

    const reset = () => {
      setIsAnimating(false);
      setCurrentIndex(nextIndex);
      oldElementRotate.value = 0; // 重置旧元素位置（下次作为旧元素时使用）
      newElementY.value = 90; // 重置新元素位置
      newElementOpacity.value = 0;
      oldElementOpacity.value = 1;
    };

    oldElementRotate.value = withTiming(90, {
      duration: 500,
      easing: Easing.out(Easing.quad),
    });

    oldElementOpacity.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.quad),
    });

    newElementY.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.quad),
    });

    newElementOpacity.value = withTiming(1, { duration: 500 }, (finished) => {
      if (finished) {
        // scheduleOnRN(reset);
      }
    });

    setTimeout(() => {
      reset();
    }, 3000);
  };

  // 5. 旧元素的动画样式（当前显示的元素）
  const oldElementStyle = useAnimatedStyle(() => ({
    opacity: oldElementOpacity.value,
    transformOrigin: "100% 0%",
    transform: [{ rotateX: `${oldElementRotate.value}deg` }],
  }));

  // 6. 新元素的动画样式（即将显示的元素）
  const newElementStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: newElementY.value }],
    // opacity: newElementOpacity.value,
  }));

  const children = useMemo(() => {
    const res = [];
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if ((i + 1) % singleGroup === 0 && i !== 0) {
        arr.push(data[i]);
        res.push(arr);
        arr = [];
      } else {
        arr.push(data[i]);
      }
    }
    res.push(data);

    return res.map((group, index) => (
      <View
        key={index}
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          flexGrow: 0,
          overflow: "hidden",
        }}
      >
        {group.map((item, index) => renderItem(item, index))}
      </View>
    ));
  }, [data.length]);

  // 当前显示的元素
  const currentChild = children[currentIndex];
  // 即将显示的元素
  const nextChild = children[getNextIndex()];

  useEffect(() => {
    handleSwitch();
  }, [isAnimating]);

  return (
    <View style={styles.container}>
      {/* 旧元素（当前显示的内容） */}
      <Animated.View style={[oldElementStyle]}>{currentChild}</Animated.View>

      {/* 新元素（即将显示的内容，动画期间叠加显示） */}
      {isAnimating && (
        <Animated.View
          style={[
            { position: "absolute", bottom: 0, left: 0, right: 0 },
            newElementStyle,
          ]}
        >
          {nextChild}
        </Animated.View>
      )}
    </View>
  );
};

// 样式
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexGrow: 0,
  },
});

export default SlideUpSwitcher;
