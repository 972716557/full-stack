import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Layout from "../components/layout/layout";
import { useRef, useState } from "react";
import IconFont from "../components/common/iconfont";
import { Image } from "expo-image";
import src from "../../assets/burger.png";
import { SwipeListView } from "react-native-swipe-list-view";
import useCartCount from "app/store/cart";
import CommonCheckbox from "app/components/common/checkbox";
import Price from "app/components/common/price";
import TakeoutTag from "app/components/common/takeout-tag";
import { router } from "expo-router";
import AddressSheet from "app/components/common/address-sheet";

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#fff",
    padding: 8,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 12,
    flexShrink: 0,
    flexGrow: 0,
  },
  title: {
    fontSize: 14,
    flexShrink: 1,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    width: 40,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "#F5F5F5",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  listContainer: {
    flex: 1,
  },
  // 隐藏项容器（左滑时显示）
  hiddenContainer: {
    flex: 1,
    flexDirection: "row-reverse", // 按钮靠右显示
  },
  deleteButton: {
    width: 60,
    height: 80,
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  desc: {
    fontSize: 10,
    color: "#999",
  },
  tag: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
    fontSize: 10,
    marginLeft: 4,
  },
  card: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  address: {
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 4,
    marginRight: 4,
  },
  selectAddress: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "rgba(221, 212, 212, 0.26)",
    borderRadius: 4,
    marginBottom: 12,
    justifyContent: "space-between",
  },
});

const Cart = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([
    { id: 1, title: "pizza calzone european pizza calzone european" },
    { id: 2, title: "pizza calzone european  calzone european" },
    { id: 3, title: "pizza calzone european pizza  european" },
    { id: 4, title: "pizza calzone european pizza calzone " },
  ]);

  const [checked, setChecked] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const onDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const cartCount = useCartCount((state) => state.cartCount);
  const [visible, setVisible] = useState(false);

  const ref = useRef(null);

  const CartCart = ({ showDeleteButton }) => {
    const [data, setData] = useState([
      { id: 1, title: "香辣鸡腿中国汉堡+翅根+薯条+可乐" },
      { id: 2, title: "香辣鸡腿中国汉堡+翅根+薯条" },
      { id: 3, title: "香辣鸡腿中国汉堡+翅根+薯条+可乐" },
      { id: 4, title: "香辣鸡腿中国汉堡+薯条+可乐" },
    ]);

    const [number, setNumber] = useState(999);
    const plus = () => {
      setNumber((i) => i + 1);
    };
    const minus = () => {
      setNumber((i) => i - 1);
    };
    const handleDelete = (id, rowMap) => {
      // 关闭当前滑动的项（可选，删除前先收起）
      rowMap[id]?.closeRow();
      // 从数据源中移除
      setData((prevData) => prevData.filter((item) => item.id !== id));
    };

    // 2. 渲染左滑时显示的隐藏按钮（右侧删除按钮）
    const renderHiddenItem = ({ item }, rowMap) => (
      <View style={styles.hiddenContainer}>
        {/* 删除按钮 */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id, rowMap)}
        >
          <Text style={styles.deleteText}>
            <IconFont name="delete" color="#fff" size={18} />
          </Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 16,
            flexWrap: "nowrap",
            flex: 1,
          }}
        >
          <Pressable
            onPress={() => {
              router.push("/restaurant/id");
            }}
          >
            <View style={[styles.row, { flex: 1, maxWidth: 220 }]}>
              <CommonCheckbox />
              <TakeoutTag text="外卖" style={{ marginLeft: 12 }} />
              <Text numberOfLines={1} style={styles.address}>
                塔斯汀·中国汉堡（深圳南山区海岸海岸城店）
              </Text>
              <IconFont name="arrow-right" size={6} />
            </View>
          </Pressable>
          <View style={[styles.row, { flexShrink: 0 }]}>
            <Text style={{ color: "#ffc107", fontSize: 12 }}>34分钟达到</Text>
          </View>
        </View>
        <Pressable
          onPress={() => {
            setVisible(true);
            ref.current.expand();
          }}
        >
          <View style={styles.selectAddress}>
            <View style={styles.row}>
              <IconFont name="location" size={12} color="#666" />
              <Text style={{ fontSize: 12, fontWeight: 500, color: "#666" }}>
                深圳南山区南三环西路
              </Text>
            </View>
            <IconFont name="arrow-right" size={6} />
          </View>
        </Pressable>
        <SwipeListView
          // 数据源
          data={data}
          // 渲染正常列表项
          renderItem={({ item: { title, id }, index }) => (
            <View
              style={{
                flexDirection: "row",
                gap: 12,
                backgroundColor: "#fff",
                alignItems: "center",
              }}
            >
              <CommonCheckbox />
              <Image source={src} style={styles.img} />
              <View
                style={{
                  flex: 1,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={styles.title}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {title}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 8,
                  }}
                >
                  <View style={[styles.row, { alignItems: "baseline" }]}>
                    <Price price={9} dot=".9" />
                    <Text style={{ fontSize: 12, color: "red", marginLeft: 4 }}>
                      到手价
                    </Text>
                    <Text
                      style={{ fontSize: 12, color: "#999", marginLeft: 4 }}
                    >
                      ￥19.9
                    </Text>
                  </View>
                  {showDeleteButton ? (
                    <View
                      style={[
                        styles.icon,
                        {
                          flexShrink: 0,
                          backgroundColor: "#E04444",
                        },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          // onDelete(id);
                        }}
                      >
                        <IconFont name="delete" color="#fff" size={14} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity onPress={minus}>
                        <View style={styles.icon}>
                          <IconFont name="minus" size={8} />
                        </View>
                      </TouchableOpacity>
                      <Text style={styles.number}>{number}</Text>
                      <TouchableOpacity onPress={plus}>
                        <View style={styles.icon}>
                          <IconFont
                            name="plus"
                            size={8}
                            style={{ transform: [{ translateX: -1 }] }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
          // 渲染左滑显示的隐藏项
          renderHiddenItem={renderHiddenItem}
          // 左滑距离（负值表示向左滑动）
          rightOpenValue={-80} // 滑动80px显示完整删除按钮
          // 列表项key
          keyExtractor={(item) => item.id}
          // 列表容器样式
          style={styles.listContainer}
          contentContainerStyle={{ gap: 20 }}
        />
      </View>
    );
  };

  return (
    <Layout
      safeAreaViewProps={{ edges: ["top", "left", "right"] }}
      style={{
        position: "relative",
        paddingHorizontal: 0,
      }}
      header={{
        style: { paddingHorizontal: 12 },
        showBackButton: false,
        title: (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>购物车</Text>
            <Text style={{ color: "#999" }}>（{cartCount}）</Text>
          </View>
        ),
        rightNode: (
          <>
            {isEdit ? (
              <Text onPress={() => setIsEdit(false)}>完成</Text>
            ) : (
              <Text onPress={() => setIsEdit(true)}>管理</Text>
            )}
          </>
        ),
      }}
    >
      <ScrollView>
        <View style={{ padding: 12, gap: 16, backgroundColor: "#f5f5f5" }}>
          <View style={styles.card}>
            <CartCart onDelete={onDelete} showDeleteButton={isEdit} />
          </View>
          <View style={styles.card}>
            <CartCart onDelete={onDelete} showDeleteButton={isEdit} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.row}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <CommonCheckbox
              onChange={(checked) => {
                // setIsEdit(checked);
              }}
            />
            <Text>全选</Text>
            <View>
              <View style={[styles.row, { alignItems: "baseline" }]}>
                <Text style={{ fontSize: 12 }}>已选1件，合计: </Text>
                <Price price="29" dot=".90" />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Text style={styles.desc}>优惠减：</Text>
                <Text style={styles.desc}>￥</Text>
                <Text style={styles.desc}>10</Text>
                <Text style={styles.tag}>优惠明细</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 12,
              backgroundColor: "#F58D1D",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>去结算</Text>
          </View>
        </View>
      </View>
      <AddressSheet
        ref={ref}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
      />
    </Layout>
  );
};
export default Cart;
