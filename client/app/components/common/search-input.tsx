import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import IconFont from "./iconfont";

const SearchInput = ({ placeholder, onSearch }) => {
  const [text, setText] = useState("");

  // 清空输入框
  const clearText = () => {
    setText("");
    onSearch(""); // 通知父组件搜索内容已清空
  };

  // 输入变化时触发搜索
  const handleTextChange = (value) => {
    setText(value);
    onSearch(value); // 实时搜索，也可改为防抖处理
  };

  return (
    <View style={styles.container}>
      {/* 搜索图标（左侧） */}
      <IconFont
        name="search"
        size={18}
        color="#999"
        style={styles.searchIcon}
      />

      {/* 输入框 */}
      <TextInput
        style={styles.input}
        placeholder={placeholder || "请输入搜索内容"}
        placeholderTextColor="#999"
        value={text}
        onChangeText={handleTextChange}
        autoCorrect={false} // 关闭自动纠错
        returnKeyType="search" // 键盘回车按钮显示"搜索"
      />

      {/* 清除按钮（X，右侧，有内容时显示） */}
      {text.length > 0 && (
        <TouchableOpacity onPress={clearText} style={styles.clearButton}>
          <IconFont name="circle-clear" size={16} color="#999" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // 水平排列图标和输入框
    alignItems: "center",
    height: 40,
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5", // 灰色背景
    borderRadius: 20, // 圆角
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 8, // 与输入框的间距
  },
  input: {
    flex: 1, // 占满剩余空间
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    marginLeft: 8, // 与输入框的间距
    padding: 2,
  },
});

export default SearchInput;
