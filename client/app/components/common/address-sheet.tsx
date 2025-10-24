import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ViewProps,
} from "react-native";
import IconFont from "./iconfont";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "white",
  },
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
  bold: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 6,
  },
  default: {
    paddingHorizontal: 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#FF7622",
    color: "#FF7622",
    fontSize: 12,
  },
  tag: {
    paddingHorizontal: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#3f51f0ff",
    color: "#3f51f0ff",
    fontSize: 12,
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 16,
    flex: 1,
    gap: 12,
  },
  desc: {
    fontSize: 14,
    color: "#393e55ff",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  button: {
    fontSize: 13,
    backgroundColor: "#e4e2e259",
    padding: 6,
    borderRadius: 4,
    color: "#393e55ff",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkbox: {
    width: 14,
    height: 14,
    borderRadius: 4,
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
    // zIndex: 1, // 确保在抽屉下方
  },
});

const data = [
  {
    name: "张三",
    phone: "12345678901",
    province: "广东",
    city: "深圳市",
    district: "宝安区",
    street: "宝安大道中金大厦",
    tag: "家",
    isDefault: true,
  },
  {
    name: "李世明",
    phone: "12345678901",
    province: "广东",
    city: "深圳",
    district: "宝安",
    street: "宝安大道中金大厦",
    tag: "家",
    isDefault: true,
  },
  {
    name: "李世明",
    phone: "12345678901",
    province: "广东",
    city: "深圳",
    district: "宝安",
    street: "宝安大道",
    tag: "家",
    isDefault: true,
  },
  {
    name: "李世明",
    phone: "12345678901",
    province: "广东",
    city: "深圳",
    district: "宝安",
    street: "宝安大道",
    tag: "家",
    isDefault: true,
  },
];

interface AddressProps extends ViewProps {
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  street: string;
  tag: string;
  isDefault?: boolean;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const AddressCard = ({
  province,
  city,
  street,
  district,
  name,
  phone,
  tag,
  isDefault,
  style,
  ...rest
}: AddressProps) => {
  const onDelete = () => {};
  const onEdit = () => {};
  const onCopy = () => {};
  return (
    <View style={[styles.card, style]} {...rest}>
      <View style={styles.cardHeader}>
        <Text style={styles.bold}>{name}</Text>
        <Text style={styles.bold}>{phone}</Text>
        {isDefault && <Text style={styles.default}>默认</Text>}
        <Text style={styles.tag}>{tag}</Text>
      </View>
      <View style={styles.cardHeader}>
        <Text style={styles.desc}>{province}</Text>
        <Text style={styles.desc}>{city}</Text>
        <Text style={styles.desc}>{district}</Text>
        <Text style={styles.desc}>{street}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          <Checkbox style={styles.checkbox} value={isDefault} />
          <Text style={styles.desc}>
            {isDefault ? "已默认" : "设为购物默认"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.button}>删除</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCopy}>
            <Text style={styles.button}>复制</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.button}>修改</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const AddressSheet = ({
  ref,
  visible,
  title = "选择地址",
  onClose,
  ...rest
}) => {
  const inset = useSafeAreaInsets();
  const add = () => {
    router.push("/address/add");
  };
  const onInternalClose = () => {
    onClose();
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
        <View style={[style, styles.backgroundMask]} />
      )}
      backdropComponent={CustomBackdrop}
      handleComponent={null}
      onChange={handleSheetChanges}
      {...rest}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onInternalClose} style={styles.close}>
            <IconFont name="close" size={18} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View
            style={{
              gap: 12,
              paddingHorizontal: 12,
              marginTop: 8,
              paddingBottom: 20,
            }}
          >
            {data.map((item, index) => (
              <AddressCard key={index} {...item} />
            ))}
          </View>
        </ScrollView>
        <View style={[styles.footer, { paddingBottom: inset.bottom }]}>
          <Text style={styles.add} onPress={add}>
            新增收货地址
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
export default AddressSheet;
