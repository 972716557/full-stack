import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Line } from "react-native-svg";
import { Marquee } from "@animatereactnative/marquee";

const GradientCouponCard = ({ isLinearGradient = true }) => {
  const color = !isLinearGradient && { color: "#f51b1bff" };
  return (
    <View style={[styles.outerContainer]}>
      {/* 渐变背景容器：覆盖整个优惠券 */}
      <LinearGradient
        colors={
          isLinearGradient
            ? ["#f73636ff", "rgba(233, 98, 98, 0.49)"]
            : ["#f2848138", "#f2848138"]
        } // 红色渐变（浅红→深红）
        start={{ x: 0, y: 0 }} // 渐变起点（左上角）
        end={{ x: 1, y: 0 }} // 渐变终点（右上角，横向渐变）
        style={[styles.couponContainer]}
      >
        {/* 左侧内容区（透明背景，让渐变透出来） */}
        <View style={styles.leftPart}>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={[styles.tip, color]}>¥</Text>
            <Text style={[styles.price, color]}>4</Text>
          </View>
          <Text style={[styles.tip, color]}>满5可用</Text>
          <Text style={[styles.tip, { marginLeft: 6 }, color]}>
            含新客补贴5元
          </Text>
        </View>

        {/* 中间分隔区（虚线+半圆孔，在渐变之上） */}
        <View style={[styles.separator]}>
          <View style={[styles.separatorLine]}>
            <Svg height="16" width="1">
              <Line
                x1="0" // 起点x坐标
                y1="0" // 起点y坐标
                x2="0" // 终点x坐标
                y2="100%" // 终点y坐标
                stroke={isLinearGradient ? "#fff" : "red"} // 线条颜色
                strokeWidth="1" // 线条宽度
                strokeDasharray="1, 1" // 虚线模式：5像素实线，3像素空白
              />
            </Svg>
          </View>

          {/* 上半圆孔 */}
          <View style={[styles.circle, { top: -4 }]} />
          {/* 下半圆孔 */}
          <View style={[styles.circle, { bottom: -4 }]} />
        </View>

        {/* 右侧内容区（透明背景） */}
        <View style={styles.rightPart}>
          <Text style={[styles.title, color]}>
            {!isLinearGradient && "已"}领
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignSelf: "center",
    flexGrow: 0,
  },
  // 优惠券主体容器（渐变背景）
  couponContainer: {
    flexDirection: "row",
    borderRadius: 4,
    overflow: "hidden", // 裁剪圆角外内容
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    flexGrow: 0,
    shadowRadius: 4,
  },
  // 左侧内容区（去掉背景色，让渐变透出来）
  leftPart: {
    justifyContent: "center",
    paddingLeft: 8,
    paddingVertical: 2,
    paddingRight: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  tip: {
    fontSize: 10,
    color: "#fff",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 4,
  },
  desc: {
    fontSize: 14,
    color: "#fff",
    marginTop: 4,
  },
  // 中间分隔区
  separator: {
    width: 2,
    position: "relative",
    // 分隔区背景透明，让渐变透出来
  },
  separatorLine: {
    position: "absolute",
    left: 2,
  },
  // 半圆孔（与外层背景一致，形成镂空）
  circle: {
    position: "absolute",
    left: -2, // 居中覆盖分隔线
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f5f5f5", // 与外层背景一致
    zIndex: 2, // 确保半圆在虚线上方，遮挡虚线
  },
  // 右侧内容区（透明背景）
  rightPart: {
    justifyContent: "center",
    paddingLeft: 6,
    paddingRight: 6,
    alignItems: "center",
    paddingVertical: 4,
  },
  title: {
    fontSize: 10,
    color: "#fff",
  },
  date: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)", // 白色半透明
  },
});

export default GradientCouponCard;
