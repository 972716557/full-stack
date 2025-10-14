import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";
import Header from "./header";
import { ReactNode } from "react";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    height: "100%",
    flex: 1,
  },
});

interface Header {
  title?: ReactNode;
  rightNode?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
}
interface LayoutProps {
  children: ReactNode;
  header?: Header;
  style?: StyleProp<ViewStyle>;
  safeAreaViewProps?: NativeSafeAreaViewProps;
}
const Layout = ({
  children,
  header = {},
  style,
  safeAreaViewProps,
}: LayoutProps) => {
  const { title, rightNode, style: headerStyle, onLayout } = header;
  return (
    <SafeAreaView style={[styles.container, style]} {...safeAreaViewProps}>
      <Header
        title={title}
        rightNode={rightNode}
        style={headerStyle}
        onLayout={onLayout}
      />
      {children}
    </SafeAreaView>
  );
};
export default Layout;
