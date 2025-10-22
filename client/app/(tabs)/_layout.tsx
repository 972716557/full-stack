import IconFont from "app/components/common/iconfont";
import { Tabs } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#F58D1D",
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
          tabBarIcon: ({ color, focused }) => (
            <IconFont
              name={focused ? "home-fill" : "home"}
              color={color}
              size={26}
            />
          ),
          headerShown: false,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="cart"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ position: "relative" }}>
              <IconFont
                name={focused ? "cart-fill" : "cart"}
                color={color}
                size={26}
              />
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  right: -3,
                  width: 10,
                  height: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  backgroundColor: "#cc2b2be8",
                }}
              >
                <Text style={{ fontSize: 6, color: "#fff" }}>1</Text>
              </View>
            </View>
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="config"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <IconFont
              name={focused ? "user-fill" : "user"}
              color={color}
              size={26}
            />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};
export default TabLayout;
