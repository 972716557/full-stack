import { Image } from "expo-image";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import Layout from "../components/layout/layout";
import src from "../../assets/avatar.jpg";
import IconFont from "../components/common/iconfont";
import Description from "../components/resturant/description";
import { useState } from "react";
import BigButton from "../components/common/big-button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    objectFit: "contain",
    borderRadius: 10,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ADB9C6",
    position: "absolute",
    bottom: 16,
    right: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    flexGrow: 0,
    textAlign: "center",
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  size: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F5FA",
  },
  selected: {
    backgroundColor: "#FF7622",
    color: "#fff",
  },
  label: {
    color: "#32343E",
    fontSize: 16,
  },
  ingredient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFEBE4",
  },
  ingredientText: {
    color: "#FF7622",
  },
  ingredients: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    backgroundColor: "#F0F5FA",
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginHorizontal: -24,
    paddingBottom: 60,
  },
  add: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#121223",
    borderRadius: 30,
    alignItems: "center",
  },
  addText: {
    backgroundColor: "#41414F",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: 28,
  },
  number: {
    width: 50,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
const Food = () => {
  const [size, setSize] = useState(["10“", "12“", "14”"]);
  const [selectedSize, setSelectedSize] = useState("10“");
  const [number, setNumber] = useState(1);
  return (
    <Layout
      header={{ title: "Details" }}
      safeAreaViewProps={{ edges: ["left", "right", "top"] }}
    >
      <ScrollView>
        <View style={{ position: "relative", marginTop: 20 }}>
          <Image source={src} style={styles.image} />
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.icon}>
              <IconFont name="heart" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity>
            <Text style={{ flexGrow: 0, flexDirection: "row" }}>
              Uttora Coffe House
            </Text>
          </TouchableOpacity>
        </View>
        <Description />
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <Text style={styles.label}>SIZE:</Text>
          {size.map((size) => (
            <View
              key={size}
              style={[
                styles.size,
                selectedSize === size ? styles.selected : {},
              ]}
            >
              <Text style={{ color: selectedSize === size ? "#fff" : "#333" }}>
                {size}
              </Text>
            </View>
          ))}
        </View>
        <Text style={[styles.label, { marginBottom: 20, marginTop: 20 }]}>
          INGREDIENTS
        </Text>
        <View style={styles.ingredients}>
          {["salt", "pepper", "garlic", "onion", "chicken"].map(
            (ingredient, index) => (
              <View style={styles.ingredient} key={ingredient}>
                <IconFont name={ingredient} color="#FB6D3A" />
              </View>
            )
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.price}>2.99</Text>
          <View style={styles.add}>
            <TouchableOpacity
              onPress={() => {
                setNumber((num) => num - 1);
              }}
            >
              <Text style={styles.addText}>
                <IconFont name="minus" size={20} color="#fff" />
              </Text>
            </TouchableOpacity>
            <Text style={styles.number}>{number}</Text>
            <TouchableOpacity
              onPress={() => {
                setNumber((num) => num + 1);
              }}
            >
              <Text style={styles.addText}>
                <IconFont name="plus" size={20} color="#fff" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <BigButton text="Add to cart" />
      </View>
    </Layout>
  );
};
export default Food;
