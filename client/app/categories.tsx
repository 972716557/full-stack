import Layout from "./components/layout/layout";
import { Text, StyleSheet, View, FlatList } from "react-native";
import PopularCard from "./components/popular-card";
import FoodOrderCard from "./components/resturant/food-order-card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RestaurantCard from "./components/resturant/restaurant-card";
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  columnWrapper: {
    justifyContent: "space-between", // 列之间均匀分布
    marginBottom: 16, // 行之间的间距
    gap: 16,
  },
});
const Category = () => {
  return (
    <Layout header={{ title: "Category" }} style={{ paddingBottom: 0 }}>
      <View style={styles.container}>
        <GestureHandlerRootView>
          <FlatList
            contentContainerStyle={{
              padding: 10,
              backgroundColor: "white",
              gap: 24,
            }}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            // 滚动事件触发频率（16ms/次，保证流畅）
            scrollEventThrottle={16}
            data={[{ id: 11 }, { id: 2 }, { id: 3 }, { id: 4 }]}
            renderItem={({ item }) => <RestaurantCard />}
            keyExtractor={(item) => item.id}
            // 可视区域渲染优化：指定列表项高度（已知高度时添加，提升性能）
            getItemLayout={(data, index) => ({
              length: 120, // 与itemContainer高度一致
              offset: 120 * index,
              index,
            })}
            ListHeaderComponent={
              <>
                <Text style={styles.title}>Popular Burgers</Text>
                <View style={styles.container}>
                  {[{ id: 11 }, { id: 2 }, { id: 3 }, { id: 4 }].map((item) => (
                    <View
                      key={item.id}
                      style={{ width: "48%", marginBottom: 12 }}
                    >
                      <FoodOrderCard />
                    </View>
                  ))}
                </View>
                <Text style={styles.title}>Open Restaurants</Text>
              </>
            }
          />
        </GestureHandlerRootView>
      </View>
    </Layout>
  );
};

export default Category;
