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
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    flex: 1,
    paddingHorizontal: 20,
  },
});

interface Header {
  title?: ReactNode;
  rightNode?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
  showBackButton?: boolean;
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
  const {
    title,
    rightNode,
    style: headerStyle,
    onLayout,
    showBackButton = true,
  } = header;
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={[styles.container, style]} {...safeAreaViewProps}>
        <Header
          title={title}
          showBackButton={showBackButton}
          rightNode={rightNode}
          style={[{ paddingBottom: 12 }, headerStyle]}
          onLayout={onLayout}
        />
        {children}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
export default Layout;
