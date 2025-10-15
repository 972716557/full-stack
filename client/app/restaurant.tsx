import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Layout from "./components/layout/layout";
import ProductImageCarousel from "./components/common/carousel";
import IconFont from "./components/common/iconfont";
import ButtonGroup from "./components/common/button-group";
import FoodOrderCard from "./components/resturant/food-order-card";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";
import HeaderCart from "./components/common/header-cart";
import src from "../assets/avatar.jpg";
import useCartCount from "./store/cart";
import { scheduleOnRN } from "react-native-worklets";
import Description from "./components/resturant/description";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginLeft: 10,
    color: "#666",
  },
  noMoreText: {
    padding: 20,
    textAlign: "center",
    color: "#999",
  },
  loadingFooter: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  // 分类按钮吸顶样式
  stickyCategoryContainer: {
    position: "absolute", // 固定在屏幕顶部
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    shadowColor: "#000", // 吸顶时添加阴影
    zIndex: 100,
    shadowRadius: 4,
    elevation: 4, // Android阴影
  },
  columnWrapper: {
    justifyContent: "space-between", // 列之间均匀分布
    marginBottom: 16, // 行之间的间距
    gap: 16,
  },
  // 飞行动画元素
  animationElement: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1000,
  },
  animationImage: {
    width: "100%",
    height: "100%",
  },
});

const Restaurant = () => {
  // 列表数据
  const [data, setData] = useState([
    { id: 1, title: "pizza calzone european" },
  ]);
  // 加载状态
  const [isLoading, setIsLoading] = useState(false);
  // 当前页码
  const [page, setPage] = useState(1);
  // 是否还有更多数据
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState([
    "All",
    "Pizza",
    "Burger",
    "Chicken",
    "Dessert",
    "Drinks",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 初始加载数据
  useEffect(() => {
    fetchData();
  }, []);

  // 模拟网络请求数据
  const fetchData = async () => {
    if (isLoading) return; // 避免重复请求
    setIsLoading(true);

    try {
      // 模拟接口请求（实际项目替换为真实API）
      const mockData = Array.from({ length: 10 }, (_, i) => ({
        id: (Math.random() * 10000).toFixed(0),
        title: `商品 ${(page - 1) * 10 + i + 1}`,
        price: `¥${(Math.random() * 900 + 100).toFixed(2)}`,
      }));

      // 合并新数据
      setData((prev) => (page === 1 ? mockData : [...prev, ...mockData]));
      // 模拟只有3页数据
      setHasMore(page < 3);
    } catch (err) {
      console.warn("数据请求失败：", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      setPage((prev) => prev + 1);
      fetchData(); // 加载下一页
    }
  };

  const renderCategory = () => (
    <View>
      <ButtonGroup>
        {category.map((item, index) => (
          <ButtonGroup.Item
            onPress={() => setSelectedCategory(item)}
            key={item}
            text={item}
            isSelected={selectedCategory === item}
          />
        ))}
      </ButtonGroup>
    </View>
  );

  // 渲染底部加载更多指示器
  const renderFooter = () => {
    if (!hasMore) return <Text style={styles.noMoreText}>没有更多数据了</Text>;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#2196f3" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  };
  const insets = useSafeAreaInsets();
  const safeAreaTop = insets.top; // 顶部安全距离（如iPhone刘海高度）

  const [headerHeight, setHeaderHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0); // 滚动距离
  const [categoryTop, setCategoryTop] = useState(0); // 分类按钮距离FlatList顶部的初始距离
  const categoryRef = useRef(null); // 分类按钮容器的引用
  const handleScroll = (event) => {
    if (!event?.nativeEvent) return;
    const y = event.nativeEvent.contentOffset.y;
    setScrollY(y); // 更新滚动距离
  };

  const handleCategoryLayout = () => {
    categoryRef.current?.measure((x, y) => {
      // y 是分类容器距离FlatList顶部的距离
      if (!categoryTop) {
        setCategoryTop(y);
      }
    });
  };
  const isSticky = scrollY >= categoryTop;

  const handleHeaderLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height); // 头部返回按钮区域的实际高度
  };

  const increaseCount = useCartCount((state) => state.increaseCartCount);
  const [animationVisible, setAnimationVisible] = useState(false); // 动画元素是否显示
  const startPos = { x: 100, y: 300 };
  const [endPos, setEndPos] = useState({ x: 0, y: 0 }); // 动画终点（购物车位置）

  // 引用
  const cartRef = useRef<View>(null); // 购物车图标引用

  // 1. 获取购物车图标的位置（终点）
  useEffect(() => {
    cartRef.current.measureInWindow((x, y, width, height) => {
      // 终点设为购物车中心
      setEndPos({
        x: x + width / 2,
        y: y + height / 2, // 加上顶部安全区域
      });
    });
  }, []);

  // 2. 动画参数
  const progress = useSharedValue(0); // 动画进度（0-1）
  const cartScale = useSharedValue(1); // 购物车缩放动画
  const scale = useSharedValue(1); // 列表项缩放动画

  const animatedStyle = useAnimatedStyle(() => {
    // 抛物线运动参数计算
    const startX = startPos.x;
    const startY = startPos.y;
    const endX = endPos.x;
    const endY = endPos.y;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // 水平方向匀速运动
    const translateX = startX + progress.value * deltaX - 45;
    // 垂直方向：先上升后下降，形成抛物线
    // 使用二次贝塞尔曲线或简单的平方关系模拟抛物线
    // 这里使用 (progress - progress^2) 来模拟一个先快后慢的上升和下降

    const translateY = startY + progress.value * deltaY - 166; // -100 控制抛起的高度

    return {
      transform: [{ translateX }, { translateY }, { scale: scale.value }],
      opacity: 1 - progress.value < 0.1 || progress.value === 1 ? 0 : 1, // 动画开始和结束时透明
    };
  });

  // 4. 购物车缩放动画
  const cartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cartScale.value }],
  }));

  const handleAnimationEnd = () => {
    setAnimationVisible(false);
    // 实际开发中，这里可能触发添加购物车的真正逻辑
    increaseCount();
  };

  // 5. 执行加入购物车动画
  const handleAddToCart = (e) => {
    if (animationVisible) {
      return;
    }
    setAnimationVisible(true);

    // 重置动画进度
    progress.value = 0;

    // 执行动画

    progress.value = withTiming(1, { duration: 800 }, () => {
      scheduleOnRN(handleAnimationEnd);
    });

    cartScale.value = withSequence(
      withTiming(1.3, { duration: 200 }), // 放大
      withTiming(1, { duration: 200 }) // 回弹
    );

    // 缩放动画：从小变大再变小
    scale.value = withSequence(
      withTiming(1.2, {
        duration: 200,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      }),
      withTiming(0.6, {
        duration: 200,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
      })
    );
  };

  return (
    <Layout
      header={{
        title: "Restaurant View",
        style: { paddingBottom: 12 },
        onLayout: handleHeaderLayout,
        rightNode: (
          <Animated.View style={cartAnimatedStyle}>
            <View ref={cartRef}>
              <HeaderCart />
            </View>
          </Animated.View>
        ),
      }}
      style={{ position: "relative" }}
    >
      {isSticky && (
        <View
          style={[
            styles.stickyCategoryContainer,
            { top: safeAreaTop + headerHeight, paddingHorizontal: 24 },
          ]}
        >
          {renderCategory()}
        </View>
      )}
      <GestureHandlerRootView>
        <FlatList
          contentContainerStyle={{ padding: 10, backgroundColor: "white" }}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          // 滚动事件触发频率（16ms/次，保证流畅）
          scrollEventThrottle={16}
          data={data}
          renderItem={({ item }) => (
            <FoodOrderCard onPress={(e) => handleAddToCart(e)} />
          )}
          keyExtractor={(item) => item.id}
          // 可视区域渲染优化：指定列表项高度（已知高度时添加，提升性能）
          getItemLayout={(data, index) => ({
            length: 120, // 与itemContainer高度一致
            offset: 120 * index,
            index,
          })}
          ListHeaderComponent={
            <>
              <ProductImageCarousel />
              <Description
                style={{ marginTop: 20 }}
                title="Pizza calzone european"
                desc="Prosciutto e funghi is a pizza variety that is topped with tomato sauce."
              />
              <View ref={categoryRef} onLayout={handleCategoryLayout}>
                {!isSticky && renderCategory()}
              </View>
            </>
          }
          // 滚动加载配置
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5} // 滚动到距离底部50%高度时触发加载
          ListFooterComponent={renderFooter} // 底部加载指示器
          // 可选：下拉刷新
          refreshing={isLoading && page === 1} // 仅初始加载时显示刷新动画
          onRefresh={() => {
            setPage(1);
            fetchData(); // 重新加载第一页
          }}
        />
        {/* 飞行动画元素（商品缩略图） */}
        {animationVisible && (
          <Animated.View style={[styles.animationElement, animatedStyle]}>
            {/* 飞行物显示商品缩略图 */}
            <Image
              source={src} // 实际项目应传入当前点击的商品图片
              style={styles.animationImage}
              contentFit="cover"
            />
          </Animated.View>
        )}
      </GestureHandlerRootView>
    </Layout>
  );
};
export default Restaurant;
