import * as React from "react";
import {
  Animated,
  TouchableOpacity,
  View,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
  Text,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Scroll from "./_scroll";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    flexGrow: 0,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  tabItem: {
    alignItems: "center",
    padding: 16,
  },
  desc: {
    fontSize: 12,
    color: "#646982",
  },
});
const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  first: Scroll,
  second: SecondRoute,
  third: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const inset = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "外卖" },
    {
      key: "second",
      title: (
        <Text style={{ alignItems: "baseline", gap: 2, flexDirection: "row" }}>
          <Text style={{ fontSize: 20 }}>点评</Text>
          <Text style={styles.desc}>900+</Text>
        </Text>
      ),
    },
    { key: "third", title: "商家" },
  ]);
  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <TouchableOpacity
              style={styles.tabItem}
              key={route.key}
              onPress={() => {
                setIndex(i);
              }}
            >
              <Animated.Text
                style={[
                  { opacity, fontSize: 20 },
                  index === i && { color: "red" },
                ]}
              >
                {route.title}
              </Animated.Text>
              {index === i && (
                <Animated.View
                  style={[
                    { opacity },
                    {
                      height: 4,
                      width: 20,
                      backgroundColor: "red",
                      borderRadius: 2,
                      marginTop: 4,
                    },
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      style={{ height: layout.height - inset.top - 40 }}
      initialLayout={{ width: layout.width }}
    />
  );
}
