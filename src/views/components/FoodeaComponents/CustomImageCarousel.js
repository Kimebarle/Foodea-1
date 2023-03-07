import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../../../constants";

const CustomImageCarousel = ({ data, style, onPress }) => {
  const [newData] = useState([
    { key: "spacer-left" },
    ...data,
    { key: "spacer-right" },
  ]);
  const { width } = useWindowDimensions();
  const windowSize = width * 0.7;
  const SPACER = (width - windowSize) / 2;
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      snapToInterval={windowSize}
      decelerationRate="fast"
      onScroll={onScroll}
      style={{ ...style }}
    >
      {newData.map((item, index) => {
        const style = useAnimatedStyle(() => {
          const scale = interpolate(
            x.value,
            [
              (index - 2) * windowSize,
              (index - 1) * windowSize,
              index * windowSize,
            ],
            [0.8, 1, 0.8]
          );
          return {
            transform: [{ scale }],
          };
        });
        if (!item.image) {
          return <View style={{ width: SPACER }} key={index} />;
        }
        return (
          <View style={{ width: windowSize }} key={index}>
            <Animated.View style={[styles.imageContainer, style]}>
              <TouchableOpacity onPress={onPress}>
                <Image source={item.image} style={[styles.image]} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default CustomImageCarousel;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 400,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 20,
  },
});
