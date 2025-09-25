import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import src from "../../assets/location.png";
import { useState } from "react";
import ImageGroup from "../components/image-group";
import ImagePreview from "../components/image-preview";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 400,
    objectFit: "cover",
    borderRadius: 24,
  },
  imageContent: {
    position: "relative",
  },
  titleContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    justifyContent: "space-between",
  },
  content: {
    padding: 14,
    backgroundColor: "#F5F5F5",
  },

  buttons: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 20,
    backgroundColor: "#fff",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    fontWeight: 500,
  },
  buttonActive: {
    backgroundColor: "#F05A22",
    borderWidth: 0,
    shadowColor: "#F05A22", // 阴影颜色
    shadowOffset: {
      width: 2, // 水平偏移
      height: 4, // 垂直偏移
    },
    shadowOpacity: 0.25, // 阴影不透明度 (0-1)
    shadowRadius: 3.84, // 阴影模糊半径
  },
  buttonLabel: {
    color: "#fff",
  },
  detailDescription: {
    color: "#8B8B8B",
    fontSize: 10,
    marginTop: 20,
    lineHeight: 20,
  },
  footer: {
    flexShrink: 0,
    paddingVertical: 16,
    paddingHorizontal: 34,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f5f5f5",
    gap: 12, // 按钮间距
  },
  bold: {
    fontSize: 26,
    fontWeight: 500,
  },
  footerButton: {
    paddingVertical: 10,
    backgroundColor: "#F05A22",
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
    shadowColor: "#F05A22", // 阴影颜色
    shadowOffset: {
      width: 2, // 水平偏移
      height: 8, // 垂直偏移
    },
    shadowOpacity: 0.25, // 阴影不透明度 (0-1)
    shadowRadius: 3.84, // 阴影模糊半径

    // Android 阴影属性
    elevation: 5,
  },
  footerButtonLabel: {
    color: "#fff",
    fontWeight: 500,
    fontSize: 20,
  },
  contentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default function App() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [activeKey, setActiveKey] = useState<"detail" | "preview">("detail");
  return (
    <View style={styles.content}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.content}>
          <View style={styles.imageContent}>
            <ImagePreview imgStyle={styles.image} source={src} />
            <View style={styles.titleContent}>
              <Text style={styles.title}>Location Title</Text>
              <View style={styles.description}>
                <Text style={styles.title}>Location Description</Text>
                <Text style={styles.title}>$100/night</Text>
              </View>
            </View>
          </View>
          <ImageGroup />
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => {
                setActiveKey("detail");
              }}
            >
              <View
                style={
                  activeKey === "detail"
                    ? [styles.button, styles.buttonActive]
                    : [styles.button]
                }
              >
                <Text
                  style={activeKey === "detail" ? [styles.buttonLabel] : []}
                >
                  Detail
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActiveKey("preview");
              }}
            >
              <View
                style={
                  activeKey === "preview"
                    ? [styles.button, styles.buttonActive]
                    : [styles.button]
                }
              >
                <Text
                  style={activeKey === "preview" ? [styles.buttonLabel] : []}
                >
                  preview
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.detailDescription}>
              Ea non tempor et laborum proident laborum aliquip tempor aliquip
              excepteur aliqua culpa in eu. Dolore commodo eu velit commodo id
              id. Labore proident velit occaecat reprehenderit ullamco aliqua
              reprehenderit exercitation. nostrud mollit amet. Pariatur deserunt
              amet exercitation duis Ea non tempor et laborum proident laborum
              aliquip tempor aliquip excepteur aliqua culpa in eu. Dolore
              commodo eu velit commodo id id. Labore proident velit occaecat
              reprehenderit ullamco aliqua reprehenderit exercitation. nostrud
              mollit amet. Pariatur deserunt amet exercitation duis Ea non
              tempor et laborum proident laborum aliquip tempor aliquip
              excepteur aliqua culpa in eu. Dolore commodo eu velit commodo id
              id. Labore proident velit occaecat reprehenderit ullamco aliqua
              reprehenderit exercitation. nostrud mollit amet. Pariatur deserunt
              amet exercitation duis Read more...
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.row}>
          <Text style={styles.bold}>$400</Text>
          <Text>/person</Text>
        </View>
        <View style={styles.footerButton}>
          <View>
            <Text style={styles.footerButtonLabel}>continue</Text>
          </View>
          <View>
            <SimpleLineIcons name="arrow-right" color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );
}
