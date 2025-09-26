import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { ReactNode } from "react";

const styles = StyleSheet.create({
  err: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: "#6c7278",
    marginTop: 4,
  },
});

export interface FormErrorTextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}
const FormErrorText = ({ children, style }: FormErrorTextProps) => {
  return <Text style={[styles.err, style]}>{children}</Text>;
};

export default FormErrorText;
