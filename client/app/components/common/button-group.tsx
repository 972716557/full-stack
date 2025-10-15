import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 8,
  },
  selected: {
    backgroundColor: "#F58D1D",
    color: "#fff",
    borderWidth: 0,
  },
});

const ButtonGroup = ({ children, ...rest }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
      {...rest}
    >
      <View style={[styles.buttonGroup]}>{children}</View>
    </ScrollView>
  );
};
const Item = ({ text, isSelected, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={[styles.button, isSelected ? styles.selected : {}]}>
      {text}
    </Text>
  </TouchableOpacity>
);

ButtonGroup.Item = Item;
export default ButtonGroup;
