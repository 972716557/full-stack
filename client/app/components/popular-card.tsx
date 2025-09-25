import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import defaultImage from "../../assets/location.png";
import ImageGroup from "./image-groups";

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 12,
    paddingBottom: 16,
    flexDirection: "row",
  },
  image: {
    height: "100%",
    width: 115,
    objectFit: "contain",
    borderRadius: 16,
    marginRight: 10,
  },
  title: {
    fontWeight: 500,
    fontSize: 18,
    maxWidth: 150,
  },
  content: {
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "flex-end",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 16,
    color: "#898989",
    marginTop: 2,
  },
  avatars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
  },
  label: {
    color: "#292931",
    fontSize: 10,
  },
});

export interface CardProps {
  src: string;
  title: string;
  location: string;
}

const PopularCard = (props: CardProps) => {
  const {
    src = defaultImage,
    title = "标题标题标题标题标题标题",
    location = "加拿大",
  } = props;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={src} />
      <View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
        <View style={styles.row}>
          <SimpleLineIcons name="location-pin" color="#F05A22" />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.location}>
            {location}
          </Text>
        </View>
        <View style={styles.avatars}>
          <ImageGroup />
          <Text style={styles.label}>52 reviews</Text>
        </View>
      </View>
    </View>
  );
};
export default PopularCard;
