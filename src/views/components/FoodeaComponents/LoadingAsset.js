import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
} from "../../../constants";
import IconButton from "./IconButton";
import TextButton from "./TextButton";
import { useEffect } from "react";

const LoadingAsset = ({
  itemId,
  containerStyle,
  imageStyle,
  item,
  onPress,
}) => {
  const [isFavorite, setIsFavorite] = React.useState(true);

  const favoriteHandler = () => {
    console.log(itemId);
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={{ alignItems: "center", ...containerStyle }}>
      {/* image */}
      <Image
        source={require("../../../../assets/img/images/loadasset.png")}
        style={imageStyle}
      />
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* name */}
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          You didn't order yet
        </Text>

        {/* distance and waiting time */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
            Just click the order now to discover the foods
          </Text>
        </View>
      </View>

      <TextButton
        label="Order Now"
        buttonContainerStyle={{
          marginTop: SIZES.radius,
          height: 55,
          width: 150,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
        }}
        onPress={onPress}
      />
    </View>
  );
};

export default LoadingAsset;
