import { Stack, Tabs, Link, router } from "expo-router";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import Button from "./components/button";
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
        <SimpleLineIcons size={16} color="#1f99b0" name="arrow-left" />
      </TouchableOpacity>
    </Link>
  );
};
const HeaderRight = () => {
  return (
    <Link asChild href={"/search"}>
      <TouchableOpacity>
        <SimpleLineIcons size={16} color="#1f99b0" name="options" />
      </TouchableOpacity>
    </Link>
  );
};

const Layout = () => {
  return (
    <Stack
      // 兼容安卓动画
      screenOptions={{
        headerTitleAlign: "center",
        animation: "slide_from_right",
        headerStyle: {},
        headerTintColor: "#292931",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="config" options={{ headerShown: false }} />
      <Stack.Screen
        name="detail/[id]"
        options={({ route }) => ({
          headerShadowVisible: false,
          title: route.params.title || "详情页",
          headerLeft: () => (
            <Button name="arrow-left" onPress={() => router.back()} />
          ),
          headerRight: () => <Button name="options" />,
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
