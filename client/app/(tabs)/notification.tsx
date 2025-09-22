import { Image } from "expo-image";
import * as React from "react";
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import src from "../../assets/avatar.jpg";
import { SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../components/card";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PopularCard from "../components/popular-card";

const styles = StyleSheet.create({
  whole: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F5F5F5",
  },
  name: {
    fontSize: 20,
    color: "#263238",
    fontWeight: 500,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    marginRight: 12,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    boxShadow: "0 3px 6px #f05a221f",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // 安卓阴影
    elevation: 4,
    // ios阴影
  },
  internalContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D2D2D",
    marginTop: 20,
  },
  input: {
    height: 36,
    width: 200,
    boxShadow: "0 3px 6px #f05a221f",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    flex: 1,
  },
  inputButton: {
    width: 36,
    height: 35,
    borderRadius: 10,
    color: "#fff",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContent: {
    flexDirection: "row",
    gap: 20,
    marginTop: 4,
    alignItems: "center",
  },
  locationImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  locationText: {
    color: "#595959",
    fontWeight: "500",
    marginTop: 4,
  },
  locationContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  location: {
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 24,
  },
  headerViewAll: {
    color: "#F05A22",
    fontSize: 16,
  },
  card: {
    paddingVertical: 12,
  },
  item: {
    marginRight: 10,
  },
});

export default function TabViewExample() {
  return (
    <ScrollView style={styles.whole}>
      <Text>通知</Text>
    </ScrollView>
  );
}
