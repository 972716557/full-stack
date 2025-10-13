import { TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF7622",
    borderRadius: 16,
    padding: 16,
    marginTop: 32,
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
const BigButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default BigButton;
