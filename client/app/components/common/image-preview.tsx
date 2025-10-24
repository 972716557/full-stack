import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ImageStyle,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

interface ImagePreviewProps {
  source: string;
  imgStyle?: StyleProp<ImageStyle>;
}

const ImagePreview = ({ source, imgStyle }: ImagePreviewProps) => {
  const [isViewerVisible, setIsViewerVisible] = useState(false);

  return (
    <View>
      {/* 这是一个小图预览 */}
      <TouchableOpacity onPress={() => setIsViewerVisible(true)}>
        <Image source={source} style={imgStyle} contentFit="cover" />
      </TouchableOpacity>

      {/* 图片查看器模态框 */}
      <ImageZoomModal
        visible={isViewerVisible}
        imageUrls={[{ url: "", props: { source } }]} // 将图片地址转换为查看器需要的格式
        onClose={() => setIsViewerVisible(false)}
      />
    </View>
  );
};

const ImageZoomModal = ({ visible, imageUrls, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.modalContainer}>
            <ImageViewer
              imageUrls={imageUrls} // 要求格式: [{ url: 'https://example.com/image.jpg' }]
              enableImageZoom={true} // 启用图片缩放
              onCancel={onClose} // 点击关闭回调，通常与手势下滑关闭配合
              enableSwipeDown={true} // 允许手势下滑关闭查看器
              // 还可以配置菜单上下文、保存图片等功能:cite[5]
              menuContext={{ saveToLocal: "保存图片", cancel: "取消" }}
              index={0} // 默认显示第几张图片
              style={styles.image}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: 400,
    objectFit: "cover",
    borderRadius: 24,
  },
  safeArea: {
    // 让SafeAreaView占满全屏
    flex: 1,
    backgroundColor: "black", // 背景色需设置在SafeAreaView上
  },
});

export default ImagePreview;
