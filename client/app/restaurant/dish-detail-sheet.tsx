import Sheet from "app/components/common/sheet";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
const DishDetailSheet = ({ ref, visible, onClose, zIndex }) => {
  return (
    <Sheet
      ref={ref}
      visible={visible}
      onClose={onClose}
      showHeader={false}
      zIndex={zIndex}
    >
      <View style={styles.container}></View>
    </Sheet>
  );
};
export default DishDetailSheet;
