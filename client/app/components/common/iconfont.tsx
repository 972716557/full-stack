import React from "react";
import { Text, StyleProp, ViewStyle } from "react-native";
import { useFonts } from "expo-font"; // Expo 字体加载钩子
import iconfont from "../../../assets/fonts/iconfont.ttf";

// 1. 定义「图标名称 → Unicode编码」映射表
// （根据你的iconfont.css替换为实际图标）
export const IconMap = {
  menu: "\ue634", // 菜单图标
  "arrow-down": "\ue628", // 下拉箭头
  cart: "\ue834", // 购物车图标
  "cart-fill": "\ue7f4", // 填充购物车图标
  search: "\ue87c", // 搜索图标
  "arrow-right": "\ue945", // 右箭头
  "arrow-left": "\ue948", // 左箭头
  heart: "\uea02", // 心形图标
  bell: "\ue624", // 铃铛图标
  user: "\ue60c", // 用户图标
  plus: " \ue600", // 加号图标
  minus: "\ue604", // 减号图标
  more: "\ue601", // 减号图标
  car: "\ue61e", // 车子图标
  question: "\ue782", // 问号图标
  clock: "\ue819", // 时间图标
  star: "\ue7df", // 星星图标
  "star-fill": "\ue608", // 填充星星图标
  logout: "\ue60e", // 退出图标
  map: "\ue7f3",
  bankcard: "\ue693",
  setting: "\ue87e",
  review: "\ue602",
  location: "\ue650",
  edit: "\ue780",
  pencil: "\ue725",
  phone: "\ue6a0",
  home: "\ue608",
  email: "\ue66f",
  work: "\ue683",
  delete: "\ue610",
  clear: "\ue603",
  "circle-clear": "\ue605",
};

// 2. IconFont 组件 props 类型定义（可选，增强类型提示）
type IconFontProps = {
  name: keyof typeof IconMap; // 图标名称（只能是IconMap中的键）
  size?: number; // 图标大小，默认20
  color?: string; // 图标颜色，默认#333
  style?: StyleProp<ViewStyle>; // 额外样式（如margin）
};

// 3. 核心组件
const IconFont: React.FC<IconFontProps> = ({
  name,
  size = 20,
  color = "#333",
  style,
}) => {
  // 加载IconFont字体（fontFamily名称需与下方一致）
  const [fontsLoaded] = useFonts({
    iconfont, // 字体文件路径
  });

  // 字体未加载完成时，显示空视图（避免乱码）
  if (!fontsLoaded) return null;

  return (
    <Text
      style={[
        {
          fontFamily: "iconfont", // 必须与useFonts中定义的名称一致
          fontSize: size,
          color: color,
          textAlign: "center",
        },
        style, // 支持外部传入样式覆盖
      ]}
    >
      {IconMap[name]} {/* 渲染对应图标的Unicode */}
    </Text>
  );
};

export default IconFont;
