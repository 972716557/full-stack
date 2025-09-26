import React from "react";
import { Text } from "react-native";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

const GradientText = ({
  colors = ["red", "green", "blue"],
  locations,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  style,
  children,
}: LinearGradientProps) => (
  <MaskedView maskElement={<Text style={style}>{children}</Text>}>
    <LinearGradient
      colors={colors}
      locations={locations}
      start={start}
      end={end}
    >
      <Text style={[style, { opacity: 0 }]}>{children}</Text>
    </LinearGradient>
  </MaskedView>
);
export default GradientText;
