import { StyleSheet, Text } from "react-native";
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
const TakeoutTag = ({ text, style, ...rest }) => {
  return (
    <Text style={[styles.tag, style]} {...rest}>
      {text}
    </Text>
  );
};
export default TakeoutTag;
