import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import defaultImage from "../../assets/location.png";

const styles = StyleSheet.create({
  label: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 500,

    borderRadius: "50%",
    backgroundColor: "#F05A22",
    position: "absolute",
  },
  image: {
    borderRadius: "50%",
    position: "absolute",
  },
  row: {
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
  },
  color: {
    color: "#fff",
    fontSize: 10,
  },
});

export interface CardProps {
  images: string[];
  size?: number;
  overlap?: number;
}

const ImageStack = (props: CardProps) => {
  const {
    images = [defaultImage, defaultImage, defaultImage, defaultImage],
    size = 30,
    overlap = 10,
  } = props;
  const totalWidth =
    size + (images.length > 3 ? 3 : images.length) * (size - overlap);
  return (
    <View style={[styles.row, { width: totalWidth, height: size }]}>
      {images.slice(0, 3).map((item, index) => (
        <Image
          key={index}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              zIndex: index,
              left: index * (size - overlap),
              borderWidth: 2,
              borderColor: "#fff",
            },
          ]}
          source={item}
        />
      ))}
      {images.length > 3 && (
        <View
          style={[
            styles.label,
            {
              width: size,
              height: size,
              zIndex: 4,
              left: 3 * (size - overlap),
              borderWidth: 2,
              borderColor: "#fff",
            },
          ]}
        >
          <Text style={styles.color}>{images.length - 3}+</Text>
        </View>
      )}
    </View>
  );
};
export default ImageStack;
