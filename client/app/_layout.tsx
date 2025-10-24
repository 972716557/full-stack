import { Stack, Tabs, Link, router } from "expo-router";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import Button from "./components/layout/button";
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
      initialRouteName="(tabs)"
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
      <Stack.Screen name="profile-info" options={{ headerShown: false }} />
      <Stack.Screen name="address" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen name="edit/profile-info" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{ headerShown: false }} />
      <Stack.Screen name="category" options={{ headerShown: false }} />
      <Stack.Screen name="recommend" options={{ headerShown: false }} />
      <Stack.Screen name="restaurant/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="address/add" options={{ headerShown: false }} />

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
