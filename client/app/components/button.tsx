import { StyleSheet, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import IconFont from "./common/iconfont";

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECF0F4",
  },
});

export interface ButtonProps {
  onPress?: () => void;
  name: React.ComponentProps<typeof IconFont>["name"];
}
const Button = ({ onPress, name }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <IconFont name={name} size={10} />
    </TouchableOpacity>
  );
};

export default Button;
