import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import defaultImage from "../../assets/location.png";
import { Link } from "expo-router";

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 12,
    paddingBottom: 16,
  },
  image: {
    width: 220,
    height: 130,
    objectFit: "contain",
    borderRadius: 16,
  },
  title: {
    fontWeight: 500,
    fontSize: 18,
  },
  button: {
    width: 25,
    height: 25,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
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
  },
});

export interface CardProps {
  src: string;
  title: string;
  location: string;
}

const Card = (props: CardProps) => {
  const { src = defaultImage, title = "标题", location = "加拿大" } = props;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={src} />
      <View style={[styles.content, styles.row]}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.row}>
            <SimpleLineIcons name="location-pin" color="#F05A22" />
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
        <Link href="/detail/1">
          <View>
            <LinearGradient
              style={styles.button}
              colors={["#F05A22", "#F78E48"]}
            >
              <SimpleLineIcons name="arrow-right" size={8} color="#fff" />
            </LinearGradient>
          </View>
        </Link>
      </View>
    </View>
  );
};
export default Card;
