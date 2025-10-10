import { View, Text, StyleSheet } from "react-native";
import BackButton from "../back-button";
import { Link } from "expo-router";
import { ReactNode } from "react";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});

interface HeaderProps {
  title?: ReactNode;
  rightNode?: ReactNode;
}
const Header = ({ title, rightNode }: HeaderProps) => {
  return (
    <View style={[styles.row, { justifyContent: "space-between" }]}>
      <View style={[styles.row, { gap: 12 }]}>
        <BackButton />
        <Text>{title}</Text>
      </View>
      {rightNode}
    </View>
  );
};
export default Header;
