import React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
} from "../../../constants";

import IconButton from "./IconButton";
const VerticalFoodCard = ({ containerStyle, item, onPress, itemId }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isAddCart, setAddCart] = React.useState(true);

  const setFavorite = () => {
    // const lmao = !isFavorite;
    setIsFavorite(!isFavorite);
    console.log(isFavorite);
  };

  return (
    <TouchableOpacity
      style={{
        width: 200,
        padding: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: "#FAF9F6",
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* Cart and Favorites */}
      <View style={{ flexDirection: "row" }}>
        {/* Cart */}
        {/* <IconButton
          icon={isAddCart ? icons.cart : icons.cart_clicked}
          iconStyle={{
            tintColor: COLORS.primary,
            position: "absolute",
            height: 25,
            width: 25,
            left: 3,
          }}
          onPress={() => setAddCart(!isAddCart)}
        /> */}

        <View>
          <TouchableOpacity onPress={() => setAddCart(!isAddCart)}>
            <Image
              source={icons.cart}
              style={{
                height: 25,
                width: 25,
                tintColor: COLORS.primary,
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Favorites */}
        <IconButton
          icon={isFavorite ? icons.love : icons.favourite}
          iconStyle={{
            tintColor: COLORS.primary,
            position: "absolute",
            height: 25,
            width: 25,
            left: 120,
          }}
          onPress={setFavorite}
        />
      </View>

      {/* Image */}
      <View
        style={{
          height: 150,
          width: 150,
          alignSelf: "center",
          justifyContent: "center",
          marginTop: SIZES.base,
        }}
      >
        <Image
          source={item.image}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </View>

      {/* Info */}
      <View
        style={{
          alignItems: "center",
          marginTop: -20,
        }}
      >
        <Text style={{ ...FONTS.h3 }}>{item.name}</Text>
        <Text style={{ color: COLORS.black, textAlign: "center", ...FONTS.h2 }}>
          ₱ {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalFoodCard;
