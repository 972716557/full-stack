import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import Layout from "./components/layout/layout";
import IconFont from "./components/common/iconfont";
import emptyCard from "../assets/empty-card.png";
import { Image } from "expo-image";
import { useState } from "react";
import BigButton from "./components/common/big-button";
const styles = StyleSheet.create({
  container: {
    width: 85,
    height: 72,
    backgroundColor: "#F0F5FA",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginTop: 8,
    color: "#464E57",
    fontSize: 12,
  },
  empty: {
    backgroundColor: "#F7F8F9",
    borderRadius: 12,
    padding: 24,
    marginTop: 16,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#686869",
    textAlign: "center",
    lineHeight: 24,
    width: "70%",
  },
  emptyImg: {
    width: 170,
    height: 110,
    borderRadius: 12,
  },
  add: {
    padding: 16,
    borderColor: "#F0F5FA",
    borderWidth: 2,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  icon: {
    position: "absolute",
    right: -4,
    top: -4,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#FF7622",
    zIndex: 100,
    borderColor: "#fff",
    borderWidth: 2,
  },
  paymentCard: {
    backgroundColor: "#F4F5F7",
    padding: 24,
    borderRadius: 12,
  },
});

const Card = ({ title, name, selected, onPress }) => {
  const isSelected = selected === name;

  const style: ViewStyle = {
    borderColor: "#FF7622",
    borderWidth: 2,
  };
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(name);
      }}
    >
      <View style={{ position: "relative", paddingBottom: 12 }}>
        {isSelected && (
          <View style={styles.icon}>
            <IconFont name="correct" size={18} color={"#fff"} />
          </View>
        )}
        <View style={[styles.container, isSelected ? style : {}]}>
          <IconFont name={name} size={30} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const PaymentMethod = ({ title, name, selected, onPress = () => {} }) => {
  const isSelected = selected === name;
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(name);
      }}
    >
      <View style={styles.paymentCard}>
        <Text style={{ fontWeight: "bold", marginBottom: 6 }}>{title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <IconFont name="bankcard" size={16} />
          <Text style={{ fontSize: 14, color: "#464E57" }}>
            1234 5678 9012 3456
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Payment = () => {
  const [selected, setSelected] = useState("wechat");
  const [cardHeight, setCardHeight] = useState(0); // 动态存储卡片高度
  const handleCardLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setCardHeight(height);
  };

  return (
    <Layout header={{ title: "Payment" }}>
      <View style={{ flex: 1 }}>
        <ScrollView horizontal style={{ flexGrow: 0 }}>
          <View style={{ flexDirection: "row", gap: 20, marginTop: 20 }}>
            {[
              { title: "Wechat Pay", name: "wechat" },
              { title: "Alipay", name: "alipay" },
              { title: "Credit Card", name: "bankcard" },
            ].map(({ title, name }) => (
              <Card
                title={title}
                key={name}
                selected={selected}
                name={name}
                onPress={(name) => {
                  setSelected(name);
                }}
              />
            ))}
          </View>
        </ScrollView>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: cardHeight,
          }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View
            style={{
              gap: 20,
            }}
          >
            <View style={styles.empty}>
              <Image style={styles.emptyImg} source={emptyCard} />
              <Text style={styles.emptyText}>No payment methods added</Text>
              <Text style={styles.emptyDescription}>
                Add your payment methods to make payments easier
              </Text>
            </View>
            <PaymentMethod title={"Wechat Pay"} name={"wechat"} />
            <View style={styles.add}>
              <IconFont name="plus" size={20} color="#FF7622" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#FF7622",
                }}
              >
                Add new
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View
        onLayout={handleCardLayout}
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          padding: 24,
          paddingBottom: 48,
          backgroundColor: "#fff",
          shadowColor: "#000", // 阴影颜色（黑色）
          shadowOffset: { width: 0, height: -4 }, // 阴影向上偏移（height为负值）
          shadowOpacity: 0.2, // 阴影透明度（0-1）
          shadowRadius: 8, // 阴影模糊半径（值越大越模糊）
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 16, marginRight: 8, color: "#A0A5BA" }}>
            Total:
          </Text>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>¥ 0.00</Text>
        </View>
        <BigButton text="Pay & Confirm" />
      </View>
    </Layout>
  );
};
export default Payment;
