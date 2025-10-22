import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
const styles = StyleSheet.create({
  tag: {
    backgroundColor: "#ffc107",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    color: "#353623ff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
export interface TakeoutTagProps {
  text?: string;
  style?: StyleProp<TextStyle>;
}

const TakeoutTag = ({ text = "外卖", style, ...rest }: TakeoutTagProps) => {
  return (
    <Text style={[styles.tag, style]} {...rest}>
      {text}
    </Text>
  );
};
export default TakeoutTag;
