import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { SimpleLineIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";

import request from "../../utils/request";
import src from "../../assets/avatar.jpg";
import { saveToken } from "../../utils/token";
import FormErrorText from "../components/form-error-text";

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 32,
    fontWeight: 500,
    color: "#101827",
  },
  content: {
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 20,
    borderBlockColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  whole: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    padding: 20,
  },
  message: {
    color: "#6c7278",
    fontSize: 10,
  },
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  remember: {
    color: "#6c7278",
  },
  forgot: {
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
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: "#6c7278",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  orLogin: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#fff",
  },
  orLoginText: {
    color: "#6c7278",
  },
  card: {
    flex: 1,
    height: 36,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function App() {
  const [isChecked, setIsChecked] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("邮箱地址格式不正确") // 内置的邮箱格式验证
      .required("请输入邮箱地址"), // 定义为必填项
    password: Yup.string()
      .min(6, "密码长度至少为6位") // 定义最小长度
      .required("请输入密码"),
  });
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const data = await request("/auth/login", {
        method: "POST",
        body: {
          email: email,
          password: password,
        },
      });
      const { token } = data;
      if (token) {
        saveToken(token);
        router.replace("/");
      }
    } catch (error) {
      Alert.alert("登陆失败");
    }
  };
  return (
    <SafeAreaProvider>
      <LinearGradient
        // 渐变颜色：左上角浅黄色 -> 右下角浅紫色
        colors={["#FFFACD", "#E6E6FA"]}
        // 渐变起点：左上角 (0,0)
        start={{ x: 0, y: 0 }}
        // 渐变终点：右下角 (1,1)
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <SafeAreaView style={styles.whole} edges={["top", "left", "right"]}>
          <View style={styles.content}>
            <Image source={src} style={styles.image} />
            <Text style={styles.title}>Login</Text>
            <Text style={styles.message}>
              Enter your email and password to log in
            </Text>
            <Formik
              initialValues={{ email: "", password: "" }} // 设置初始值
              validationSchema={LoginSchema} // 绑定验证规则
              onSubmit={(values) => {
                login(values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View style={{ width: "100%" }}>
                    <TextInput
                      placeholder="邮箱"
                      style={styles.input}
                      onChangeText={handleChange("email")} // Formik 处理值变更
                      onBlur={handleBlur("email")} // 处理失焦事件，标记为已触摸过
                      value={values.email}
                    />

                    {/* 错误提示：只在用户接触过此输入框且内容错误时显示 */}
                    {touched.email && errors.email && (
                      <FormErrorText>{errors.email}</FormErrorText>
                    )}
                  </View>

                  {/* 密码输入框 */}
                  <View style={{ width: "100%" }}>
                    <TextInput
                      placeholder="密码"
                      secureTextEntry
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      style={styles.input}
                    />
                    {touched.password && errors.password && (
                      <FormErrorText>{errors.password}</FormErrorText>
                    )}
                  </View>

                  <View style={styles.between}>
                    <View style={styles.row}>
                      <Checkbox
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? "#2196f3" : undefined} // 选中颜色
                        style={styles.checkbox}
                      />
                      <Text style={styles.remember}>Remember me</Text>
                    </View>
                    <View>
                      <Link href={"/forgot"}>
                        <Text style={styles.forgot}>Forgot Password ?</Text>
                      </Link>
                    </View>
                  </View>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.loginButton}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.loginText}>登陆</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </Formik>

            <View style={styles.orLogin}>
              <View style={styles.line}></View>
              <Text style={styles.orLoginText}>Or login with</Text>
              <View style={styles.line}></View>
            </View>
            <View style={{ flexDirection: "row", gap: 12 }}>
              {[
                "social-google",
                "social-twitter",
                "social-facebook",
                "screen-smartphone",
              ].map((item) => (
                <Card key={item} name={item} />
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Text style={{ color: "#6c7278" }}>Don’t have an account?</Text>
              <Link href={"/sign"}>
                <Text style={{ color: "#1D61E7" }}>Sign Up</Text>
              </Link>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const Card = ({ name }) => {
  return (
    <View style={styles.card}>
      <SimpleLineIcons name={name} size={20} />
    </View>
  );
};
