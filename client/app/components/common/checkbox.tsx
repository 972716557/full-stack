import Checkbox, { CheckboxProps } from "expo-checkbox";
import { useState } from "react";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    borderWidth: 1,
  },
});

const CommonCheckbox = ({ style, ...rest }: CheckboxProps) => {
  const [checked, setChecked] = useState(false);
  const onChange = () => {
    setChecked(!checked);
  };
  return (
    <Checkbox
      value={checked}
      onValueChange={onChange}
      color={checked ? "#F58D1D" : undefined}
      style={[styles.checkbox, style]}
      {...rest}
    ></Checkbox>
  );
};

export default CommonCheckbox;
