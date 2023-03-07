import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
  Image,
} from "react-native";
import React from "react";

import {
  constants,
  SIZES,
  COLORS,
  icons,
  images,
  FONTS,
} from "../../../constants";

import { TextButton } from "../../components/FoodeaComponents";

const LandingPageScreen = ({ navigation }) => {
  const scrollX = new Animated.Value(0);
  const flatListRef = React.useRef();

  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          bottom: 55,
        }}
      >
        {constants.onboarding_screens.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [
              COLORS.lightOrange,
              COLORS.primary,
              COLORS.lightOrange,
            ],
            extrapolate: "clamp",
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 30, 10],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 6,
                width: dotWidth,
                height: 10,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };
  function renderHeaderLogo() {
    return (
      <View
        style={{
          position: "absolute",
          top: SIZES.height > 800 ? 50 : 25,
          left: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={images.FOODEA_LOGO}
          resizeMode="contain"
          style={{ width: SIZES.width * 2, height: 150 }}
        />
      </View>
    );
  }

  function renderFooter() {
    return (
      <View style={{ height: 60 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Dots />
        </View>
        {/* bottom buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: SIZES.padding,
            marginVertical: SIZES.padding,
            bottom: 55,
          }}
        >
          <TextButton
            label="Skip"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.darkGray,
            }}
            onPress={() => {
              navigation.replace("LoginScreen");
            }}
          />
          <TextButton
            label="Next"
            buttonContainerStyle={{
              height: 60,
              width: 200,
              borderRadius: SIZES.radius,
            }}
            onPress={() => {
              let index = Math.ceil(Number(scrollX._value / SIZES.width));

              if (index < constants.onboarding_screens.length - 1) {
                // scroll
                flatListRef?.current?.scrollToIndex({
                  index: index + 1,
                  animated: true,
                });
              } else {
                navigation.replace("LoginScreen");
              }
            }}
          />
        </View>
      </View>
    );
  }

  // Screen Display
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white, height: SIZES.height,
      width: SIZES.width, }}>
      {renderHeaderLogo()}
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={constants.onboarding_screens}
        scrollEventThrottle={16}
        snapToAlignment={"center"}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: SIZES.width,
              }}
            >
              {/* backgroundImage */}
              <View style={{ flex: 3 }}>
                <ImageBackground
                  source={item.backgroundImage}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Image
                    source={item.bannerImage}
                    resizeMode="contain"
                    style={{
                      width: SIZES.width * 1.2,
                      height: SIZES.width * 1.2,
                      marginBottom: -120,
                    }}
                  />
                </ImageBackground>
              </View>
              {/* detail */}
              <View
                style={{
                  flex: 1,
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: SIZES.radius,
                  bottom: 55,
                }}
              >
                <Text style={{ ...FONTS.h1, fontSize: 25 }}>{item.title}</Text>
                <Text
                  style={{
                    marginTop: SIZES.radius,
                    textAlign: "center",
                    color: COLORS.darkGray,
                    paddingHorizontal: SIZES.padding,
                    ...FONTS.h5,
                    fontSize: 12,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      {renderFooter()}
    </View>
  );
};

export default LandingPageScreen;

const styles = StyleSheet.create({});
