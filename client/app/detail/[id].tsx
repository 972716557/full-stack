import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Text>详情{id}</Text>
      {/* <View style={styles.container}>
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
      </View> */}
    </ScrollView>
  );
}
