import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
}
interface LayoutProps {
  children: ReactNode;
  header?: Header;
  style?: StyleProp<ViewStyle>;
}
const Layout = ({ children, header = {}, style }: LayoutProps) => {
  const { title, rightNode } = header;
  return (
    <SafeAreaView style={[styles.container, style]}>
      <Header title={title} rightNode={rightNode} />
      {children}
    </SafeAreaView>
  );
};
export default Layout;
