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
import { useEffect } from "react";

const HorizontalFoodCard = ({
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
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        style={{
          width: 300,
          height: 150,
          flexDirection: "row",
          borderRadius: 15,
          backgroundColor: "#FAF9F6",
          ...containerStyle,
        }}
        onPress={onPress}
      >
        {/* image */}
        <Image source={{ uri: item.product_image }} style={imageStyle} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            {/* price */}
            <Text
              style={{
                ...FONTS.h2,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              ₱ {item.price}
            </Text>

            {/* name */}
            <Text style={{ ...FONTS.h4, fontWeight: "bold" }}>
              {item.product_name}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Image
                source={icons.calories}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                }}
              />
              <Text style={{ ...FONTS.h5 }}>{item.calories} calories</Text>
            </View>
          </View>

          {/* images */}
          <View style={{ position: "absolute", top: -20, right: 15 }}>
            <IconButton
              icon={isFavorite ? icons.favourite : icons.love}
              iconStyle={{
                tintColor: COLORS.primary,
                height: 25,
                width: 25,
              }}
              onPress={favoriteHandler}
            />
          </View>

          <View style={{ position: "absolute", bottom: -20, right: 15 }}>
            <TouchableOpacity>
              <Image
                source={icons.cart}
                style={{ tintColor: "#F54748", height: 25, width: 25 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HorizontalFoodCard;
