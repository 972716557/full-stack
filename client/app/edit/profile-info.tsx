import { Alert, Pressable, ScrollView, TextInput, View } from "react-native";
import { Text, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import src from "../../assets/avatar.jpg";
import IconFont from "../components/common/iconfont";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import BackButton from "../components/back-button";
import Header from "../components/layout/header";
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    height: "100%",
    gap: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  input: {
    width: "100%",
    padding: 16,
    backgroundColor: "#F0F5FA",
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#FF7622",
    borderRadius: 12,
    padding: 20,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: 500,
    position: "absolute",
    bottom: 40,
    left: 20,
  },
  buttonLabel: {
    color: "#fff",
    textAlign: "center",
  },
});

// 1. 请求相册权限
const requestPermission = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("权限不足", "需要相册权限才能选择图片");
    return false;
  }
  return true;
};

const uploadImage = async (uri) => {
  if (!uri) {
    Alert.alert("提示", "请先选择一张图片");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", {
      uri,
      type: "image/jpeg",
      name: `upload-${Date.now()}.jpg`,
    });

    const response = await axios.post("https://你的上传接口地址", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // 'Authorization': `Bearer ${yourToken}`,
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        console.log(`上传进度：${progress}%`);
      },
    });

    if (response.status === 200) {
      Alert.alert("成功", "图片上传完成");
    }
  } catch (error) {
    console.error("上传失败：", error);
    Alert.alert("失败", "图片上传出错，请重试");
  }
};
// 2. 从相册选择图片
const pickImage = async () => {
  const hasPermission = await requestPermission();
  if (!hasPermission) return;

  // 打开相册选择图片
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "images", // 只允许选择图片
    allowsEditing: false, // 允许裁剪
    aspect: [4, 3], // 裁剪比例
    quality: 0.8, // 图片质量（0-1，值越小体积越小）
  });

  // 处理选择结果
  if (!result.canceled) {
    uploadImage(result.assets?.[0].uri); // 上传图片
  }
};

// 上传图片逻辑（不变）

const EditProfileInfo = () => {
  const [parentWidth, setParentWidth] = useState(0);

  // 父元素布局完成后触发，获取其宽度
  const handleParentLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width); // 更新父元素宽度
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#fff" }}
        onLayout={handleParentLayout}
      >
        <ScrollView style={styles.container}>
          <Header title="Edit Profile" />
          <View
            style={{
              position: "relative",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Image
              style={{ width: 130, height: 130, borderRadius: 65 }}
              source={src}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 100,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#FF7622",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable onPress={pickImage}>
                <IconFont name="pencil" color="#fff" />
              </Pressable>
            </View>
          </View>
          <View style={{ gap: 24 }}>
            <View style={{ gap: 8 }}>
              <Text style={styles.label}>FULL NAME</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={{ gap: 8 }}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={{ gap: 8 }}>
              <Text style={styles.label}>PHONE NUMBER</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={{ gap: 8 }}>
              <Text style={styles.label}>BIO</Text>
              <TextInput style={styles.input} />
            </View>
          </View>
        </ScrollView>
        <View style={[styles.button, { width: parentWidth - 40 }]}>
          <Text style={styles.buttonLabel}>Save</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default EditProfileInfo;
