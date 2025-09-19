import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const router = useRouter();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>这是搜索页面</Text>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Text style={styles.title}>返回首页</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "yellow",
  },
});
