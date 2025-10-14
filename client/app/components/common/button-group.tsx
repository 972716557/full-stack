import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  buttonGroup: {
    marginTop: 12,
    flexDirection: "row",
    gap: 8,
  },
  selected: {
    backgroundColor: "#F58D1D",
    color: "#fff",
    borderWidth: 0,
  },
});

const ButtonGroup = ({
  onPress,
  data = ["burger", "sandwich", "tea", "pizza", "pig", "beef"],
}) => {
  const [selected, setSelected] = useState(data[0]);
  const onPressKeyword = (item) => {
    onPress?.(item);
    setSelected(item);
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
    >
      <View style={styles.buttonGroup}>
        {data.map((item) => (
          <TouchableOpacity onPress={() => onPressKeyword(item)} key={item}>
            <Text
              style={[styles.button, item === selected ? styles.selected : {}]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ButtonGroup;
