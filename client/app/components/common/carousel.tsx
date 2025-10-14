import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";
import src from "../../../assets/burger.png";

// 屏幕宽度（用于轮播图宽度适配）
const { width: screenWidth } = Dimensions.get("window");

// 模拟商品图片数据（网络图片地址）
const productImages = [
  "https://picsum.photos/600/400?random=1",
  "https://picsum.photos/600/400?random=2",
  "https://picsum.photos/600/400?random=3",
  "https://picsum.photos/600/400?random=4",
];

const ProductImageCarousel = ({ style, data = productImages }) => {
  // 当前轮播索引（控制指示器高亮）
  const [currentIndex, setCurrentIndex] = useState(0);
  // 轮播组件引用（用于手动切换图片）
  const carouselRef = useRef(null);

  // 1. 渲染商品图片
  const renderImageItem = ({ item, index }) => {
    // 图片加载错误时显示默认图
    const handleError = (e) => {
      e.target.source = src; // 替换为你的默认图路径
    };

    return (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item }}
          style={[styles.image, { width: screenWidth - 40 }]}
          onError={handleError}
          placeholder={src}
        />
      </View>
    );
  };

  // 2. 渲染底部切换点（指示器）
  const renderIndicators = () => {
    return (
      <View style={styles.indicatorsContainer}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicatorDot,
              // 当前索引的点高亮
              index === currentIndex && styles.activeIndicatorDot,
            ]}
            onPress={() => {
              // 点击切换点跳转到对应图片
              carouselRef.current?.scrollTo({ index });
              setCurrentIndex(index);
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* 轮播图组件 */}
      <Carousel
        ref={carouselRef}
        data={productImages}
        renderItem={renderImageItem}
        // 轮播图宽度（占满屏幕宽度）
        width={screenWidth}
        height={180}
        // 每次滑动切换一个图片
        scrollAnimationDuration={300} // 切换动画时长
        onSnapToItem={(index) => setCurrentIndex(index)} // 滑动后更新当前索引
        loop={false} // 是否循环播放（商品图通常不循环）
      />

      {/* 底部切换点指示器 */}
      {renderIndicators()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  imageContainer: {
    flexGrow: 0,
    height: 180,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    objectFit: "cover",
  },
  // 指示器容器
  indicatorsContainer: {
    position: "absolute", // 绝对定位，脱离文档流
    bottom: 15, // 距离图片底部15px（可调整）
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  // 未选中的点
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd", // 灰色点
  },
  // 选中的点（高亮）
  activeIndicatorDot: {
    backgroundColor: "#2196f3", // 蓝色高亮（可改为品牌色）
  },
});

export default ProductImageCarousel;
