import { View, Text, TouchableOpacity } from "react-native";
import IconFont from "./iconfont";

const SelectAddress = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <IconFont name="location" size={18} color="#333" />
        <Text style={{ fontSize: 16, color: "#333" }}>中金大厦</Text>
      </View>
    </TouchableOpacity>
  );
};
export default SelectAddress;
