import { router } from "expo-router";
import Button from "./button";

const BackButton = () => {
  const onPress = () => {
    router.back();
  };
  return <Button name="arrow-left" onPress={onPress}></Button>;
};
export default BackButton;
