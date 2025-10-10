import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import IconFont from "./components/iconfont";
import { Link } from "expo-router";
import BackButton from "./components/back-button";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    height: "100%",
    gap: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
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
      desc: "Vishal Khadok",
    },
    {
      title: "Email",
      icon: "email",
      color: "#413DFB",
      desc: "vishal@example.com",
    },
    {
      title: "Phone Number",
      icon: "phone",
      color: "#369BFF",
      desc: "408-841-0926",
    },
  ],
];
const Config = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={styles.container}>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={[styles.row, { gap: 12 }]}>
            <BackButton />
            <Text>Profile Info</Text>
          </View>
          <Link asChild href={"/edit/profile-info"}>
            <Text style={{ color: "#FF7622", textDecorationLine: "underline" }}>
              Edit
            </Text>
          </Link>
        </View>
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
                <View key={item.title}>
                  <View style={[styles.row, { gap: 12 }]}>
                    <View style={styles.icon}>
                      <IconFont name={item.icon} size={20} color={item.color} />
                    </View>
                    <View style={{ gap: 2 }}>
                      <Text>{item.title}</Text>
                      <Text style={styles.desc}>{item.desc}</Text>
                    </View>
                  </View>
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
