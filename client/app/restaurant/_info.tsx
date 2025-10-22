import { Image } from "expo-image";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import src from "../../assets/burger.png";
import CouponCard from "./_coupon";
import { Marquee } from "@animatereactnative/marquee";
import TakeoutTag from "app/components/common/takeout-tag";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
  },
  whole: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  tag: {
    backgroundColor: "#862c2cff",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    color: "#fff",
    fontSize: 12,
  },
  desc: {
    fontSize: 12,
    color: "#959191ff",
  },
  message: {
    fontSize: 12,
    fontWeight: "bold",
  },
  bottom: {
    flexDirection: "row",
    gap: 4,
  },
  coupon: {
    backgroundColor: "#f73636ff",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  couponLabel: {
    fontSize: 12,
    color: "#fff",
    fontWeight: 500,
  },
  marqueeText: {
    fontSize: 12,
    color: "#646982",
  },
});
const Info = () => {
  return (
    <View style={styles.card}>
      <View style={styles.whole}>
        <Image style={styles.img} source={src} />
        <View style={styles.content}>
          <Text style={styles.title}>塔斯汀·中国汉堡（海岸城店）</Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={styles.tag}>堂食餐厅</Text>
            <TakeoutTag text="外卖" />
            <TakeoutTag text="品牌" />
          </View>
          <View style={{ flexDirection: "row", gap: 30 }}>
            <View style={{ gap: 2 }}>
              <Text style={styles.desc}>评分</Text>
              <Text style={styles.message}>6.8</Text>
            </View>
            <View style={{ gap: 2 }}>
              <Text style={styles.desc}>已售</Text>
              <Text style={styles.message}>68万+</Text>
            </View>
            <View style={{ gap: 2 }}>
              <Text style={styles.desc}>秒送</Text>
              <Text style={styles.message}>25分钟达</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.bottom}>
          <View style={styles.coupon}>
            <Text style={styles.couponLabel}>满50减10</Text>
          </View>
          <CouponCard />
          <CouponCard isLinearGradient={false} />
        </View>
      </ScrollView>
      <Marquee spacing={20} speed={1} style={{ marginTop: 8 }}>
        <Text style={styles.marqueeText}>
          就是中国味道，就爱中国汉堡！我们坚持手擀汉堡
        </Text>
      </Marquee>
    </View>
  );
};
export default Info;
