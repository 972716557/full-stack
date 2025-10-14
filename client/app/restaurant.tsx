import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Layout from "./components/layout/layout";
import ProductImageCarousel from "./components/common/carousel";
import IconFont from "./components/common/iconfont";
import ButtonGroup from "./components/common/button-group";
import FoodOrderCard from "./components/resturant/food-order-card";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  desc: {
    fontSize: 16,
    color: "#A0A5BA",
    marginTop: 4,
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
    top: 100, // 距离屏幕顶部0px
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    shadowColor: "#000", // 吸顶时添加阴影
    zIndex: 100,
    shadowRadius: 4,
    elevation: 4, // Android阴影
  },
});
const Restaurant = () => {
  // 列表数据
  const [data, setData] = useState([]);
  // 加载状态
  const [isLoading, setIsLoading] = useState(false);
  // 当前页码
  const [page, setPage] = useState(1);
  // 是否还有更多数据
  const [hasMore, setHasMore] = useState(true);

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
  const categoryRef = useRef(null); // 分类按钮容器的引用  const [scrollY, setScrollY] = useState(0); // 滚动距离
  const handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    setScrollY(y); // 更新滚动距离
  };

  const handleCategoryLayout = () => {
    categoryRef.current?.measure((x, y) => {
      // y 是分类容器距离FlatList顶部的距离
      setCategoryTop(y);
    });
  };
  const isSticky = scrollY >= categoryTop;
  const handleHeaderLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height); // 头部返回按钮区域的实际高度
  };
  return (
    <Layout
      header={{
        title: "Restaurant View",
        style: { paddingBottom: 12 },
        onLayout: handleHeaderLayout,
      }}
      style={{ position: "relative" }}
    >
      {isSticky && (
        <View
          style={[
            styles.stickyCategoryContainer,
            { top: safeAreaTop + headerHeight + 12, paddingHorizontal: 24 },
          ]}
        >
          <ButtonGroup />
        </View>
      )}
      <GestureHandlerRootView>
        <FlatList
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 20,
          }}
          onScroll={handleScroll}
          // 滚动事件触发频率（16ms/次，保证流畅）
          scrollEventThrottle={16}
          data={data}
          renderItem={({ item }) => <FoodOrderCard />}
          keyExtractor={(item) => item.id}
          // 可视区域渲染优化：指定列表项高度（已知高度时添加，提升性能）
          getItemLayout={(data, index) => ({
            length: 120, // 与itemContainer高度一致
            offset: 120 * index,
            index,
          })}
          ListHeaderComponent={
            <>
              <ProductImageCarousel style={{ marginTop: 20 }} />
              <Text style={styles.title}>Spicy restaurant</Text>
              <Text numberOfLines={4} ellipsizeMode="tail" style={styles.desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl,
                euismod nisl nisl nisl nisl. Sed euismod, nisl nec ultricies
                lacinia, nisl nisl aliquam nisl, euismod nisl nisl nisl nisl.
                Sed euismod, nisl nec ultricies
              </Text>
              <View style={[{ flexDirection: "row", gap: 20, marginTop: 16 }]}>
                <View style={styles.text}>
                  <IconFont name="star" color="#FF7622" />
                  <Text>4.5</Text>
                </View>
                <View style={styles.text}>
                  <IconFont name="car" color="#FF7622" />
                  <Text>Free</Text>
                </View>
                <View style={styles.text}>
                  <IconFont name="clock" color="#FF7622" />
                  <Text>30 mins</Text>
                </View>
              </View>
              <View ref={categoryRef} onLayout={handleCategoryLayout}>
                <ButtonGroup />
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
      </GestureHandlerRootView>
    </Layout>
  );
};
export default Restaurant;
