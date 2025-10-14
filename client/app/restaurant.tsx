import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Layout from "./components/layout/layout";
import ProductImageCarousel from "./components/common/carousel";
import IconFont from "./components/common/iconfont";
import ButtonGroup from "./components/common/button-group";
import FoodOrderCard from "./components/resturant/food-order-card";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

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
});
const Restaurant = () => {
  // 列表数据
  const [data, setData] = useState([1, 2, 3, 4]);
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
        id: `${page}-${i}`,
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

  return (
    <Layout header={{ title: "Restaurant View" }}>
      <GestureHandlerRootView>
        <ProductImageCarousel style={{ marginTop: 20 }} />
        <Text style={styles.title}>Spicy restaurant</Text>
        <Text numberOfLines={4} ellipsizeMode="tail" style={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          nisl nec ultricies lacinia, nisl nisl aliquam nisl, euismod nisl nisl
          nisl nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam
          nisl, euismod nisl nisl nisl nisl. Sed euismod, nisl nec ultricies
        </Text>
        <View style={{ flexDirection: "row", gap: 20, marginTop: 16 }}>
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
        <ButtonGroup />

        <View style={{ flex: 1, padding: 10 }}>
          <FlatList
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 20,
            }}
            data={data}
            renderItem={({ item }) => <FoodOrderCard />}
            keyExtractor={(item) => item.id}
            // 可视区域渲染优化：指定列表项高度（已知高度时添加，提升性能）
            getItemLayout={(data, index) => ({
              length: 120, // 与itemContainer高度一致
              offset: 120 * index,
              index,
            })}
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
        </View>
      </GestureHandlerRootView>
    </Layout>
  );
};
export default Restaurant;
