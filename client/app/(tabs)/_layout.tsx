import { Tabs, Link } from "expo-router";
import { Image } from "expo-image";
import { SimpleLineIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

const Logo = () => {
  return (
    <Image contentFit="contain" source={require("../../assets/favicon.png")} />
  );
};

const TabButton = (props) => {
  const { name, ...rest } = props;
  return <SimpleLineIcons size={20} name={name} {...rest} />;
};
const HeaderButton = (props) => {
  const { name, ...rest } = props;
  return (
    <Link asChild {...rest}>
      <TouchableOpacity>
        <SimpleLineIcons size={20} color="#1f99bo" name={name} />
      </TouchableOpacity>
    </Link>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerTitle: () => <Logo />,
        headerLeft: () => <HeaderButton name="bell" href="/articles" />,
        headerRight: () => (
          <>
            <HeaderButton name="magnifier" href="/search" />
            <HeaderButton name="options" href="/video" />
          </>
        ),
        tabBarActiveTintColor: "#1f99b0",
        // 去除安卓手机切换tab的波纹样式
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            activeOpacity={1}
            style={[props.style, { backgroundColor: "transparent" }]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "配置",
          tabBarIcon: ({ color }) => <TabButton name="compass" color={color} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="video"
        options={{
          title: "视频",
          tabBarIcon: ({ color }) => <TabButton name="user" color={color} />,
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};
export default TabLayout;
