import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import IconFont from "./iconfont";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReactNode, Ref } from "react";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

interface SheetProps extends BottomSheetProps {
  visible: boolean;
  title?: string;
  onClose?: () => void;
  footer?: ReactNode;
  ref?: Ref<BottomSheetMethods>;
  showHeader?: boolean;
}

const styles = StyleSheet.create({
  backgroundMask: {
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  contentContainer: {
    zIndex: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    paddingVertical: 12,
  },
  close: {
    position: "absolute",
    right: 20,
    top: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
  },
  add: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#fb4d4dfe",
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  footer: {
    backgroundColor: "#fff",
    padding: 16,
  },
  backdrop: {
    position: "absolute", // 绝对定位，覆盖全屏
    top: 0,
    left: 0,
    backgroundColor: "#000", // 黑色遮罩（配合透明度）
  },
});

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Sheet = ({
  visible,
  title = "选择地址",
  onClose,
  children,
  footer,
  ref,
  showHeader = true,
  ...rest
}: SheetProps) => {
  const inset = useSafeAreaInsets();

  const onInternalClose = () => {
    onClose?.();
    ref.current?.close();
  };
  // 3. 共享值：跟踪抽屉打开状态（用于遮罩动画）
  const progress = useSharedValue(0);
  const handleSheetChanges = (index) => {
    progress.value = withTiming(index === -1 ? 0 : 1, { duration: 200 });
  };

  const CustomBackdrop = ({ animatedIndex }) => {
    // 计算遮罩透明度：随抽屉打开程度变化（0→1）
    const animatedStyle = useAnimatedStyle(() => {
      // animatedIndex 范围：-1（完全关闭）→ 0（完全打开）
      const opacity = interpolate(
        animatedIndex.value,
        [-1, 0],
        [0, 0.8],
        Extrapolation.CLAMP
      );
      return { opacity };
    });

    return (
      <Animated.View
        style={[
          styles.backdrop,
          animatedStyle,
          {
            width: screenWidth, // 屏幕宽度
            height: screenHeight, // 屏幕高度（关键）
          },
        ]}
      />
    );
  };

  return (
    <BottomSheet
      ref={ref}
      index={visible ? 1 : -1} // 初始状态：-1 表示完全关闭（隐藏在屏幕外）
      snapPoints={["80%"]}
      enablePanDownToClose={true}
      backgroundComponent={({ style }) => (
        <TouchableWithoutFeedback onPress={onInternalClose}>
          <View style={[style, styles.backgroundMask]} />
        </TouchableWithoutFeedback>
      )}
      backdropComponent={CustomBackdrop}
      handleComponent={null}
      onChange={handleSheetChanges}
      {...rest}
    >
      <BottomSheetView style={styles.contentContainer}>
        {showHeader && (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onInternalClose} style={styles.close}>
              <IconFont name="close" size={18} />
            </TouchableOpacity>
          </View>
        )}
        {children}
        <View style={[styles.footer, { paddingBottom: inset.bottom }]}>
          {footer}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
export default Sheet;
