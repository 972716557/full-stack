import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import DatePicker from "@react-native-community/datetimepicker";

import request from "../../utils/request";
import { Link } from "expo-router";
import GradientText from "../components/gradient-text";

const styles = StyleSheet.create({
  flex: {
    flex: 1, // 占满整个屏幕
  },
  input: {
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f2f3f5",
    padding: 10,
    width: "100%",
  },
  content: {
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 20,
    borderBlockColor: "#fff",
    borderRadius: 20,
    gap: 20,
  },
  whole: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  mb6: {
    marginBottom: 6,
  },
  textColor: {
    color: "#6c7278",
  },
  blue: {
    color: "#4d81e7",
  },
  loginButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1D61E7",
    padding: 16,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#1D61E7",
  },
  loginText: {
    color: "#fff",
    fontWeight: 500,
    fontSize: 12,
    textAlign: "center",
  },
  name: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  font: {
    fontSize: 26,
    fontWeight: 500,
    textAlign: "center",
  },
  inputContent: {
    width: "100%",
  },
  iconButton: {
    position: "absolute",
    right: 10,
    bottom: 0,
    height: "100%",
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default function Sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const register = async () => {
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
    <SafeAreaProvider>
      <LinearGradient
        // 渐变颜色：左上角浅黄色 -> 右下角浅紫色
        colors={["#B6b0f6", "#fff"]}
        // 渐变起点：左上角 (0,0)
        start={{ x: 1, y: 0 }}
        // 渐变终点：右下角 (1,1)
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.whole} edges={["top", "left", "right"]}>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              style={{ alignSelf: "flex-start" }}
            >
              <SimpleLineIcons name="arrow-left" size={20} />
            </TouchableOpacity>
            <View>
              <GradientText
                colors={["#4983F6", "#C175F5", "#FBACB7"]} // 你的三种颜色
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0, 0.5, 1]}
                style={styles.font}
              >
                Sign Up
              </GradientText>
            </View>
            <View
              style={[
                {
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 8,
                },
              ]}
            >
              <Text style={styles.textColor}>Already have an account?</Text>
              <Link href={"/login"} replace>
                <Text style={styles.blue}>Login</Text>
              </Link>
            </View>
            <View style={styles.name}>
              <View style={styles.flex}>
                <Text style={[styles.mb6, styles.textColor]}>First Name</Text>
                <TextInput style={styles.input} />
              </View>
              <View style={styles.flex}>
                <Text style={[styles.mb6, styles.textColor]}>Last Name</Text>
                <TextInput style={styles.input} />
              </View>
            </View>
            <View style={styles.inputContent}>
              <Text style={[styles.mb6, styles.textColor]}>Email</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inputContent}>
              <Text style={[styles.mb6, styles.textColor]}>Birth of Date</Text>
              <DatePicker
                style={{ width: "100%" }}
                value={selectedDate}
                mode="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate="2057-12-31"
                confirmBtnText="确定"
                cancelBtnText="取消"
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    alignItems: "flex-start",
                  },
                }}
                onDateChange={(date) => setSelectedDate(date)}
              />
            </View>
            <View style={styles.inputContent}>
              <Text style={[styles.mb6, styles.textColor]}>Phone Number</Text>
              <TextInput style={[styles.input]} />
            </View>
            <View style={styles.inputContent}>
              <Text style={[styles.mb6, styles.textColor]}>Set Password</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <TextInput
                  style={[styles.input]}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.iconButton}
                >
                  <SimpleLineIcons name={isPasswordVisible ? "eye" : "lock"} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={register}>
              <View style={styles.loginButton}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.loginText}>register</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}
