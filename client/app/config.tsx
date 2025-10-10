import { ScrollView, View, Text, StyleSheet } from "react-native";
import Button from "./components/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import IconFont from "./components/common/iconfont";
import { router } from "expo-router";
import BackButton from "./components/back-button";
import Header from "./components/layout/header";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    height: "100%",
    gap: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: 500,
  },
  desc: {
    fontSize: 14,
    color: "#A0A5BA",
    marginTop: 12,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#F6F8FA",
    gap: 12,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

const data = [
  [
    {
      title: "Personal Information",
      icon: "user",
      color: "#FB6F3D",
      to: "/profile-info",
    },
    { title: "Address", icon: "map", color: "#413DFB", to: "/address" },
  ],
  [
    { title: "Cart", icon: "cart", color: "#369BFF" },
    { title: "Favorite", icon: "heart", color: "#B33DFB" },
    { title: "Notification", icon: "bell", color: "#FFAA2A" },
    { title: "Payment", icon: "bankcard", color: "#369BFF" },
  ],
  [
    { title: "FAQs", icon: "question", color: "#FB6D3A" },
    { title: "User Reviews", icon: "review", color: "#2AE1E1" },
    { title: "Settings", icon: "setting", color: "#413DFB" },
  ],
  [{ title: "Log Out", icon: "logout", color: "#FB4A59" }],
];
const Config = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={styles.container}>
        <Header title="Profile" />
        <View style={[styles.row, { gap: 32, marginVertical: 20 }]}>
          <Image
            source={require("../assets/avatar.jpg")}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <View>
            <Text style={styles.username}>Username</Text>
            <Text style={styles.desc}>user@example.com</Text>
          </View>
        </View>
        <View style={{ gap: 20 }}>
          {data.map((group, index) => (
            <View key={index} style={styles.card}>
              {group.map((item) => (
                <View
                  key={item.title}
                  style={[styles.row, { justifyContent: "space-between" }]}
                  onTouchEnd={() => {
                    router.push(item.to || "");
                  }}
                >
                  <View style={[styles.row, { gap: 12 }]}>
                    <View style={styles.icon}>
                      <IconFont name={item.icon} size={20} color={item.color} />
                    </View>
                    <Text>{item.title}</Text>
                  </View>
                  <IconFont name="arrow-right" size={12} color="#747783" />
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Config;
