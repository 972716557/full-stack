import { Link, Stack, Tabs } from "expo-router";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
const Logo = () => {
  return (
    <Image
      style={styles.logo}
      contentFit="contain"
      source={require("../assets/favicon.png")}
    />
  );
};

const HeaderLeft = () => {
  return (
    <Link asChild href={"/detail/1"}>
      <TouchableOpacity>
        <SimpleLineIcons size={20} color="#1f99b0" name="bell" />
      </TouchableOpacity>
    </Link>
  );
};
const HeaderRight = () => {
  return (
    <Link asChild href={"/search"}>
      <TouchableOpacity>
        <SimpleLineIcons size={20} color="#1f99b0" name="options" />
      </TouchableOpacity>
    </Link>
  );
};

const Layout = () => {
  // 用来管理页面堆栈，添加页面切换效果，并增加标题
  return (
    <Stack
      // 兼容安卓动画
      screenOptions={{
        headerTitleAlign: "center",
        animation: "slide_from_right",
        // 在这里可以给所有页面添加统一的header样式
        headerStyle: {
          backgroundColor: "#e29447",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* 在这里统一配置页面标题 */}
      <Stack.Screen
        name="index"
        options={{
          headerTitle: (props) => <Logo {...props} />,
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="detail/[id]"
        options={({ route }) => ({
          title: route.params.title || "详情页",
        })}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 20,
    height: 20,
  },
});
export default Layout;
