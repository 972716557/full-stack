import React, { useState } from "react";
import { View, Text, StyleSheet, StyleProp, TextStyle } from "react-native";
interface TagWithWrappingTextProps {
  tag: React.ReactNode;
  content: string;
  contentStyle?: StyleProp<TextStyle>;
}

const TagWithWrappingText = ({
  tag,
  content,
  contentStyle,
}: TagWithWrappingTextProps) => {
  // 存储tag的宽度（动态获取，适配不同内容）
  const [tagWidth, setTagWidth] = useState(0);

  // 获取tag的实际宽度（通过onLayout事件）
  const handleTagLayout = (e) => {
    const { width } = e.nativeEvent.layout;
    setTagWidth(width);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tag} onLayout={handleTagLayout}>
        {tag}
      </View>
      <Text
        style={[
          styles.contentText,
          { marginLeft: tagWidth + 8 }, // 左间距 = tag宽度 + 8px间距
          contentStyle,
        ]}
      >
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  tag: {
    position: "absolute", // 绝对定位，固定在左侧
    left: 0, // 与容器左侧的距离（和容器padding一致）
    top: 2, // 与容器顶部的距离（和容器padding一致）
    borderRadius: 2,
  },

  // 内容文字：自动换行，左间距动态适配tag宽度
  contentText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22, // 优化行高，提升可读性
  },
});

export default TagWithWrappingText;
