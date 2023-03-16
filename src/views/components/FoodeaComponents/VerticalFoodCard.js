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
import axios from "axios";
import { Alert } from "react-native";

import IconButton from "./IconButton";
import { BASE_URL } from "../../../api/context/auth/config";
const VerticalFoodCard = ({
  containerStyle,
  item,
  onPress,
  itemId,
  user_id,
}) => {
  const [isFavorite, setIsFavorite] = React.useState(true);
  const [isAddCart, setAddCart] = React.useState(true);

  const checkedIsFavorite = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}favorites?user_id[eq]=${user_id}&&product_id[eq]=${itemId}`
      );
      console.log(response.data);
      return response.data.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const addToFavorites = async () => {
    try {
      const response = await axios.post(`${BASE_URL}favorites`, {
        user_id: user_id,
        product_id: itemId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const setFavorite = async () => {
    const itemExist = await checkedIsFavorite();
    if (itemExist) {
      Alert.alert("Warning", "Item is already Favorited", [
        {
          text: "Confirm",
          onPress: () => console.log("Item Already is Favorite"),
          style: "cancel",
        },
      ]);
    } else {
      const newItem = await addToFavorites();
      if (newItem) {
        Alert.alert("Successful", "Added To Favorites", [
          {
            text: "Confirm",
            onPress: () => console.log("added"),
            style: "cancel",
          },
        ]);
        setIsFavorite(!isFavorite);
      } else {
        console.log("cant add item");
      }
    }
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
          icon={isFavorite ? icons.favourite : icons.love}
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
          source={require("../../../../assets/img/dummyData/hamburger.png")}
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
        <Text style={{ ...FONTS.h3 }}>{item.product_name}</Text>
        <Text style={{ color: COLORS.black, textAlign: "center", ...FONTS.h2 }}>
          ₱ {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalFoodCard;
