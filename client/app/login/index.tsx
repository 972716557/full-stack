import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import request from "../../utils/request";

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    color: "yellow",
  },
  title: {
    fontSize: 20,
    color: "yellow",
  },
});

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    try {
      const data = await request("/auth/login", {
        method: "POST",
        body: {
          email: email,
          password: password,
        },
      });
      const { token } = data;
      localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <View>
        <TextInput
          placeholder="请输入邮箱"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="请输入密码"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={login}>
          <Text style={styles.title}>登陆</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </>
  );
}
