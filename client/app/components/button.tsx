import { StyleSheet, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  button: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 3px 6px #f05a221f",
  },
});

export interface ButtonProps {
  onPress?: () => void;
  name?: (typeof SimpleLineIcons)["name"];
}
const Button = ({ onPress, name }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <SimpleLineIcons name={name} size={8} />
    </TouchableOpacity>
  );
};

export default Button;
