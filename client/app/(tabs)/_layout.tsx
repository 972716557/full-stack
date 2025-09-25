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
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#f5f5f5",
          borderBottomWidth: 0,
          shadowOpacity: 0, // 对于iOS，如果需要移除阴影，也可以设置此项
          elevation: 0, // 对于Android，移除阴影
        },
        // headerTitleAlign: "center",
        // headerTitle: () => <Logo />,
        // headerLeft: () => <HeaderButton name="bell" href="/articles" />,
        // headerRight: () => (
        //   <>
        //     <HeaderButton name="magnifier" href="/search" />
        //     <HeaderButton name="options" href="/video" />
        //   </>
        // ),
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
          title: "",
          tabBarIcon: ({ color }) => <TabButton name="home" color={color} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="notification"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabButton name="bell" color={color} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="heart"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabButton name="heart" color={color} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="user"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabButton name="user" color={color} />,
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};
export default TabLayout;
