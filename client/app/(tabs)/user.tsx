import { Image } from "expo-image";
import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import src from "../../assets/avatar.jpg";
import { SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import request from "../../utils/request";

const styles = StyleSheet.create({
  whole: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    position: "relative",
  },
  imageContainer: {
    shadowColor: "red",
    shadowOffset: {
      width: 2, // 水平偏移
      height: 4, // 垂直偏移
    },
    shadowOpacity: 0.25, // 阴影不透明度 (0-1)
    shadowRadius: 3.84, // 阴影模糊半径
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: "50%",
  },
  username: {
    color: "#fff",
    fontSize: 24,
    fontWeight: 500,
    marginTop: 10,
  },
  header: {
    backgroundColor: "#D7E538",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  content: {
    margin: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    position: "absolute",
    top: 200,
    flex: 1,
    gap: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemLabel: {
    fontSize: 16,
    marginLeft: 18,
  },
});

export default function TabViewExample() {
  const [parentWidth, setParentWidth] = React.useState(0);
  const logout = () => {
    request("/auth/logout");
    router.dismissTo("/login");
  };

  const handleParentLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width); // 更新父元素宽度
  };
  const data = [
    {
      title: "Account",
      children: [
        {
          name: "user",
          title: "Edit Profile",
        },
        {
          name: "book-open",
          title: "Security",
        },
        {
          name: "bell",
          title: "Notification",
        },
      ],
    },
    {
      title: "Support & About",
      children: [
        {
          name: "tag",
          title: "My Subscribtion",
        },
        {
          name: "question",
          title: "Help & Support",
        },
        {
          name: "note",
          title: "Terms and Policies",
        },
      ],
    },
    {
      title: "Cache & cellular",
      children: [
        {
          title: "Free up space",
          name: "trash",
        },
      ],
    },
    {
      title: "Actions",
      children: [
        {
          name: "logout",
          title: "Logout",
        },
      ],
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.whole} edges={["left", "right"]}>
        <View style={styles.whole} onLayout={handleParentLayout}>
          <View style={styles.header}>
            <View style={styles.imageContainer}>
              <Image source={src} style={styles.image} />
            </View>
            <Text style={styles.username}>yu chen</Text>
          </View>
          <ScrollView style={[styles.content, { width: parentWidth - 40 }]}>
            <View style={[{ gap: 30 }]}>
              {data.map(({ title, children }) => (
                <View key={title} style={{ gap: 20 }}>
                  <Text style={styles.title}>{title}</Text>
                  {children.map(({ name, title: sonTitle }) => (
                    <View style={styles.item} key={sonTitle}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <SimpleLineIcons name={name} size={24} />
                        <Text style={styles.itemLabel}>{sonTitle}</Text>
                      </View>
                      <SimpleLineIcons name="arrow-right" />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
