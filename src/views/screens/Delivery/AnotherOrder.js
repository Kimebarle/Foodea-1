import React from "react";
import { View, Text, BackHandler, Image } from "react-native";
import { TextButton } from "../../components/FoodeaComponents";
import {
  icons,
  SIZES,
  COLORS,
  dummyData,
  FONTS,
  images,
} from "../../../constants";

const AnotherOrder = ({ navigation }) => {
  React.useEffect(() => {
    const backhandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );

    return () => backhandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={images.success}
          resizeMode="contain"
          style={{
            width: 150,
            height: 150,
          }}
        />
        <Text
          style={{
            marginTop: SIZES.padding,
            ...FONTS.h1,
          }}
        >
          Thank you!
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: SIZES.base,
            color: COLORS.darkGray,
            ...FONTS.h3,
          }}
        >
          Want to order another foods? Click the continue button.
        </Text>
      </View>

      <TextButton
        label="Done"
        buttonContainerStyle={{
          height: 55,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
        }}
        onPress={() => navigation.navigate("HomeScreen")}
      />
    </View>
  );
};

export default AnotherOrder;
