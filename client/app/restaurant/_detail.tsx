import Sheet from "app/components/common/sheet";
import { View, Text, StyleSheet, Button } from "react-native";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
  },
  desc: {
    fontSize: 12,
    color: "#999",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  yuan: {
    fontSize: 12,
  },
  container: {
    paddingHorizontal: 12,
  },
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#c4cdd644",
    gap: 12,
    marginTop: 12,
  },
  delete: {
    color: "red",
  },
  bold: {
    fontWeight: 500,
  },
});
const DetailSheet = ({ ref, visible, onClose, ...rest }) => {
  return (
    <Sheet
      ref={ref}
      visible={visible}
      title="价格明细"
      onClose={onClose}
      {...rest}
    >
      <View style={styles.container}>
        <View style={[styles.row, { paddingHorizontal: 12 }]}>
          <Text style={styles.title}>商品合计</Text>
          <View style={styles.row}>
            <Text style={[styles.desc, { marginRight: 2 }]}>
              （包含打包费）
            </Text>
            <Text style={styles.yuan}>¥</Text>
            <Text style={styles.price}>10.00</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text>商品总价</Text>
            <Text>￥9.9</Text>
          </View>
          <View style={styles.row}>
            <Text>打包费</Text>
            <Text>￥1</Text>
          </View>
        </View>
        <View style={[styles.row, { marginTop: 20, paddingHorizontal: 12 }]}>
          <Text style={styles.title}>预估费用</Text>
          <Text style={styles.bold}>￥10.00</Text>
        </View>
        <View style={[styles.card]}>
          <View style={styles.row}>
            <Text>门店基础运费</Text>
            <Text style={styles.bold}>￥9.9</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bold}>门店减运优惠</Text>
            <Text style={styles.delete}>-￥1</Text>
          </View>
          <Text style={styles.desc}>
            以上优惠不包含红包和京豆bao、代金券、会员卡等优惠，请在阶段啊页面查看：最终运费与配送方式/地址以及一下优惠详情。
          </Text>
        </View>
      </View>
    </Sheet>
  );
};
export default DetailSheet;
