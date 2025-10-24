import { View, Text, TouchableOpacity } from "react-native";
import IconFont from "./iconfont";

const SelectAddress = ({ onPress, size = 16 }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <IconFont name="location" size={size} color="#333" />
        <Text style={{ fontSize: size, color: "#333" }}>中金大厦</Text>
      </View>
    </TouchableOpacity>
  );
};
export default SelectAddress;
