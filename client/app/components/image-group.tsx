import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import defaultImage from "../../assets/location.png";

const styles = StyleSheet.create({
  imageGroup: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageGroupItem: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  mask: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "rgba(35,35,35,0.5)",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

export interface CardProps {
  images: string[];
  size?: number;
  overlap?: number;
}

const ImageGroup = (props: CardProps) => {
  const {
    images = [defaultImage, defaultImage, defaultImage, defaultImage],
    size = 30,
    overlap = 10,
  } = props;
  const totalWidth =
    size + (images.length > 3 ? 3 : images.length) * (size - overlap);
  return (
    <View style={styles.imageGroup}>
      {images?.slice(0, 4).map((item, index) =>
        index < 3 ? (
          <Image key={index} style={styles.imageGroupItem} source={item} />
        ) : (
          <View key={index} style={[{ position: "relative" }]}>
            <Image style={styles.imageGroupItem} source={item} />
            {images.length > 4 && (
              <View style={styles.mask}>
                <Text style={[{ color: "#fff", fontWeight: 500 }]}>
                  {images.length - 4}+
                </Text>
              </View>
            )}
          </View>
        )
      )}
    </View>
  );
};
export default ImageGroup;
