import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Link href="/detail" asChild>
          <Text style={styles.title}>{id}</Text>
        </Link>
        <StatusBar style="auto" />
        <TouchableOpacity
          onPress={() => {
            navigation.setOptions({ title: "这是navigation设置的详情页" });
          }}
        >
          <Text>修改标题</Text>
        </TouchableOpacity>
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
    color: "#f2f3ff",
  },
});
