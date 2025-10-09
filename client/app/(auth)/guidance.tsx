import React, { useRef } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Onboarding from "react-native-onboarding-swiper"; // 请确保使用正确的导入路径
import img from "../../assets/avatar.jpg"; // 请替换为你自己的图片路径

const styles = StyleSheet.create({
  img: {
    width: 240, // 占满整个屏幕
    height: 300,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  description: {
    color: "#646982",
    fontSize: 16,
  },
  view: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  skipLabel: {
    width: "100%",
    paddingVertical: 22,
    backgroundColor: "#FF7622",
    borderRadius: 12,
    marginHorizontal: 20,
  },
  skipLabelText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
  },
  nextLabel: {
    width: "100%",
    paddingVertical: 22,
  },
  nextLabelText: {
    color: "#646982",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
  },
  container: {
    padding: 20,
  },
  dot: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
    gap: 8,
  },
});

// 指引页的数据配置

const App = () => {
  // 当用户完成指引时触发
  const handleOnDone = () => {
    Alert.alert("完成", "现在将进入主应用。");
    // 此处通常执行导航操作，跳转到主页面
    // 例如：navigation.navigate('Home');
  };

  // 当用户跳过指引时触发
  const handleOnSkip = () => {
    Alert.alert("跳过", "您跳过了引导流程。");
    // 此处同样应执行导航操作
  };

  const page = useRef(0);
  const onboardingRef = useRef<Onboarding>(null);
  const router = useRouter();

  const Content = ({ title, index }) => (
    <>
      <View style={styles.view}>
        <Text style={styles.description}>{title}</Text>
      </View>
      <View style={styles.dot}>
        {[...Array(3)].map((_, i) => (
          <View
            key={i}
            style={{
              width: 8,
              height: 8,
              marginHorizontal: 3,
              backgroundColor: page.current === i ? "#FF7622" : "#FFE1CE",
              borderRadius: 4,
            }}
          />
        ))}
      </View>
      {index < 2 ? (
        <>
          <View
            style={styles.skipLabel}
            onTouchEnd={() => {
              onboardingRef.current.goNext();
              page.current += 1;
            }}
          >
            <Text style={styles.skipLabelText}>下一个</Text>
          </View>
          <View
            style={styles.nextLabel}
            onTouchEnd={() => {
              router.replace("/");
            }}
          >
            <Text style={styles.nextLabelText}>跳过</Text>
          </View>
        </>
      ) : (
        <View
          style={styles.skipLabel}
          onTouchEnd={() => {
            router.replace("/");
          }}
        >
          <Text style={styles.skipLabelText}>开始</Text>
        </View>
      )}
    </>
  );
  const onboardingPages = [
    {
      title: <Text style={styles.title}>Order from choosen chef</Text>,
      subtitle: (
        <Content
          index={0}
          title="Get all your loved foods in one once place,
you just place the orer we do the rest"
        />
      ),
      image: <Image style={styles.img} source={img} />, // 请替换为你自己的图片路径
    },
    {
      title: "Free delivery offers",
      subtitle: (
        <Content
          index={1}
          title="Get all your loved foods in one once place,you just place the orer we do the rest"
        />
      ),
      image: <Image style={styles.img} source={img} />,
    },
    {
      title: "准备就绪",
      subtitle: (
        <Content
          index={2}
          title="Get all your loved foods in one once place,you just place the orer we do the rest"
        />
      ),
      image: <Image style={styles.img} source={img} />,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Onboarding
        ref={onboardingRef}
        pages={onboardingPages}
        onDone={handleOnDone}
        onSkip={handleOnSkip}
        // 以下是一些常用的自定义属性
        bottomBarHighlight={false} // 是否高亮底部按钮栏
        skipLabel={
          <View style={styles.skipLabel}>
            <Text style={styles.skipLabelText}>跳过</Text>
          </View>
        }
        nextLabel={
          <View>
            <Text>下一个</Text>
          </View>
        }
        showPagination={false}
        DotComponent={({ selected }) => {
          let backgroundColor = selected ? "#FF7622" : "#FFE1CE";
          return (
            <View
              style={{
                width: 8,
                height: 8,
                marginHorizontal: 3,
                backgroundColor,
                borderRadius: 4,
              }}
            />
          );
        }}
        doneLabel={
          <View>
            <Text>开始使用</Text>
          </View>
        }
        controlStatusBar="red" // 底部栏背景色
      />
    </View>
  );
};

export default App;
