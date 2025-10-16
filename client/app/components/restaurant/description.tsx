import { View, Text, StyleSheet } from "react-native";
import RestaurantIconGroup from "./restaurant-icon-group";
const styles = StyleSheet.create({
  desc: {
    fontSize: 16,
    fontWeight: "400",
    color: "#A0A5BA",
    marginBottom: 20,
    lineHeight: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
const Description = ({
  title = "pizza calzone european",
  desc = "Prosciutto e funghi is a pizza variety that is topped with tomato sauce.",
  ...rest
}) => {
  return (
    <View {...rest}>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text numberOfLines={3} style={styles.desc}>
        {desc}
      </Text>
      <RestaurantIconGroup />
    </View>
  );
};
export default Description;
