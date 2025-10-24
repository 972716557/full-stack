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
  return (
    <Text style={styles.container}>
      <View style={styles.tag}>{tag}</View>
      <Text style={[styles.contentText, contentStyle]}>{content}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    gap: 4,
  },
  tag: {
    marginRight: 4,
  },
  // 内容文字：自动换行，左间距动态适配tag宽度
  contentText: {
    fontSize: 14,
    color: "#333",
    paddingLeft: 4,
  },
});

export default TagWithWrappingText;
