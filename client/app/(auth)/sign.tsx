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
import { LinearGradient } from "expo-linear-gradient";
import { SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import DatePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import * as Yup from "yup";

import request from "../../utils/request";
import { Link } from "expo-router";
import GradientText from "../components/gradient-text";
import FormErrorText from "../components/form-error-text";

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("邮箱地址格式不正确") // 内置的邮箱格式验证
      .required("请输入邮箱地址"), // 定义为必填项
    password: Yup.string()
      .min(6, "密码长度至少为6位") // 定义最小长度
      .required("请输入密码"),
    firstName: Yup.string().required("请输入姓"),
    lastName: Yup.string().required("请输入名"),
    phone: Yup.string().required("请输入电话"),
  });

  const register = async ({ email, password }) => {
    try {
      await request("/auth/register", {
        method: "POST",
        body: {
          email: email,
          password: password,
        },
      });
      router.replace("/login");
    } catch (error) {
      Alert.alert("注册失败");
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
            <Formik
              initialValues={{
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                date: new Date(),
                phone: "",
              }} // 设置初始值
              validationSchema={LoginSchema} // 绑定验证规则
              onSubmit={(values) => {
                register(values);
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
                  <View style={styles.name}>
                    <View style={styles.flex}>
                      <Text style={[styles.mb6, styles.textColor]}>
                        First Name
                      </Text>
                      <TextInput
                        style={styles.input}
                        value={values.firstName}
                        onChangeText={handleChange("firstName")} // Formik 处理值变更
                        onBlur={handleBlur("firstName")} // 处理失焦事件，标记为已触摸过
                      />
                      {touched.firstName && errors.firstName && (
                        <FormErrorText>{errors.firstName}</FormErrorText>
                      )}
                    </View>
                    <View style={styles.flex}>
                      <Text style={[styles.mb6, styles.textColor]}>
                        Last Name
                      </Text>
                      <TextInput
                        style={styles.input}
                        value={values.lastName}
                        onChangeText={handleChange("lastName")} // Formik 处理值变更
                        onBlur={handleBlur("lastName")} // 处理失焦事件，标记为已触摸过
                      />
                      {touched.lastName && errors.lastName && (
                        <FormErrorText>{errors.lastName}</FormErrorText>
                      )}
                    </View>
                  </View>
                  <View style={styles.inputContent}>
                    <Text style={[styles.mb6, styles.textColor]}>Email</Text>
                    <TextInput
                      value={values.email}
                      onChangeText={handleChange("email")} // Formik 处理值变更
                      onBlur={handleBlur("email")} // 处理失焦事件，标记为已触摸过
                      style={styles.input}
                    />
                    {touched.email && errors.email && (
                      <FormErrorText>{errors.email}</FormErrorText>
                    )}
                  </View>
                  <View style={styles.inputContent}>
                    <Text style={[styles.mb6, styles.textColor]}>
                      Birth of Date
                    </Text>
                    <DatePicker
                      style={{ width: "100%" }}
                      onBlur={handleBlur("date")} // 处理失焦事件，标记为已触摸过
                      value={values.date}
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
                    {selectedDate && <FormErrorText>请选择日期</FormErrorText>}
                  </View>
                  <View style={styles.inputContent}>
                    <Text style={[styles.mb6, styles.textColor]}>
                      Phone Number
                    </Text>
                    <TextInput
                      style={[styles.input]}
                      value={values.phone}
                      onChangeText={handleChange("phone")} // Formik 处理值变更
                      onBlur={handleBlur("phone")} // 处理失焦事件，标记为已触摸过
                    />
                    {touched.phone && errors.phone && (
                      <FormErrorText>{errors.phone}</FormErrorText>
                    )}
                  </View>
                  <View style={styles.inputContent}>
                    <Text style={[styles.mb6, styles.textColor]}>
                      Set Password
                    </Text>
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
                        value={values.password}
                        onChangeText={handleChange("password")} // Formik 处理值变更
                        onBlur={handleBlur("password")} // 处理失焦事件，标记为已触摸过
                      />

                      <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.iconButton}
                      >
                        <SimpleLineIcons
                          name={isPasswordVisible ? "eye" : "lock"}
                        />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && (
                      <FormErrorText>{errors.password}</FormErrorText>
                    )}
                  </View>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.loginButton}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.loginText}>register</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}
