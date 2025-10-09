import { Tabs } from "expo-router";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const TabButton = (props) => {
  const { name, ...rest } = props;
  return <SimpleLineIcons size={20} name={name} {...rest} />;
};

const TabLayout = () => {
  return <></>;
  return (
    <Tabs
      screenOptions={{
        headerTitle: "",
        headerStyle: {
          borderBottomWidth: 0,
          shadowOpacity: 0, // 对于iOS，如果需要移除阴影，也可以设置此项
          elevation: 0, // 对于Android，移除阴影
        },
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
          headerShown: false,
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
        name="notification"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabButton name="bell" color={color} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="user"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => <TabButton name="user" color={color} />,
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};
export default TabLayout;
