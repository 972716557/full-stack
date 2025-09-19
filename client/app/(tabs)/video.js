import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View, VirtualizedList } from "react-native";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const getItemCount = (_data) => 50;

export default function App() {
  const getItem = async () => {
    try {
      const data = await request("/users");
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <VirtualizedList
          initialNumToRender={4}
          renderItem={({ item }) => <Item title={item.username} />}
          keyExtractor={(item) => item.email}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      </SafeAreaView>
    </SafeAreaProvider>
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
