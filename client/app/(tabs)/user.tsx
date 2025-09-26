import { Image } from "expo-image";
import * as React from "react";
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import src from "../../assets/avatar.jpg";
import { SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../components/card";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PopularCard from "../components/popular-card";
import { router } from "expo-router";

const styles = StyleSheet.create({
  whole: {
    flex: 1,
  },
});

export default function TabViewExample() {
  const logout = () => {
    router.dismissTo("/login");
  };
  return (
    <ScrollView style={styles.whole}>
      <TouchableOpacity onPress={logout}>
        <Text>退出登陆</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
