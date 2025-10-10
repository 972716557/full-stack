import React, { useRef, useState } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";

// 获取屏幕尺寸
const { height: screenHeight } = Dimensions.get("window");

const FullBottomSheet = () => {
  // 1. 抽屉引用：用于控制打开/关闭
  const bottomSheetRef = useRef(null);

  // 2. 定义抽屉的目标高度（80% 屏幕高度）
  // snapPoints 数组只放一个值，确保抽屉只能停靠在80%位置
  const snapPoints = ["80%"];

  // 3. 控制抽屉状态
  const [isOpen, setIsOpen] = useState(false);

  // 打开抽屉：从底部慢慢向上弹出到80%高度
  const openDrawer = () => {
    bottomSheetRef.current?.expand(); // 展开到最大高度（即80%）
    setIsOpen(true);
  };

  // 关闭抽屉：向下收起
  const closeDrawer = () => {
    bottomSheetRef.current?.close();
    setIsOpen(false);
  };

  // 4. 抽屉内容
  const renderContent = () => (
    <View style={styles.drawerContent}>
      <Text style={styles.title}>抽屉内容（80% 高度）</Text>
      <Text style={styles.description}>
        这个抽屉会从底部慢慢向上弹出，最终铺满80%的屏幕高度
      </Text>
      <Button title="关闭抽屉" onPress={closeDrawer} />
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* 主页面 */}
      <View style={styles.mainContainer}>
        <Text style={styles.mainTitle}>主页面</Text>
        <Button
          title={isOpen ? "关闭抽屉" : "从底部弹出抽屉"}
          onPress={isOpen ? closeDrawer : openDrawer}
          color="#2196f3"
        />
      </View>

      {/* 底部抽屉组件 */}
      <BottomSheet
        ref={bottomSheetRef}
        index={isOpen ? 10 : -1} // 初始状态：-1 表示完全关闭（隐藏在屏幕外）
        snapPoints={snapPoints}
        // 动画配置：控制弹出速度（值越大越慢，默认250ms）
        animationDuration={500} // 500ms 缓慢弹出，增强"慢慢抽出"的效果
        // 允许向下拖拽关闭（若想固定在80%，可设为false）
        enablePanDownToClose={true}
        // 样式：顶部圆角+阴影，增强立体感
        borderRadius={20}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: -4 }}
        shadowOpacity={0.2}
        shadowRadius={10}
        elevation={8} // Android 阴影
        // 背景遮罩：抽屉打开时，主页面变暗
        backgroundComponent={({ style }) => (
          <View style={[style, styles.backgroundMask]} />
        )}
      >
        {renderContent()}
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  mainTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333",
  },
  drawerContent: {
    flex: 1, // 占满抽屉高度（80%屏幕）
    padding: 24,
    backgroundColor: "red",
    height: 300,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    lineHeight: 24,
  },
  // 背景遮罩样式（半透明黑色）
  backgroundMask: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height: screenHeight, // 覆盖整个屏幕高度
  },
});

export default FullBottomSheet;
