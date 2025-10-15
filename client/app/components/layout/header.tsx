import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  LayoutChangeEvent,
} from "react-native";
import BackButton from "./back-button";
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
  style?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
  showBackButton?: boolean;
}
const Header = ({
  title,
  rightNode,
  style,
  onLayout,
  showBackButton,
}: HeaderProps) => {
  return (
    <View
      style={[styles.row, { justifyContent: "space-between" }, style]}
      onLayout={onLayout}
    >
      <View style={[styles.row, { gap: 12 }]}>
        {showBackButton && <BackButton />}
        <Text>{title}</Text>
      </View>
      {rightNode}
    </View>
  );
};
export default Header;
