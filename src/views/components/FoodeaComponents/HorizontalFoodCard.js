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
import { useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";
import AuthContext from "../../../api/context/auth/AuthContext";
import { Alert } from "react-native";

const HorizontalFoodCard = ({
  itemId,
  containerStyle,
  imageStyle,
  item,
  onPress,
}) => {
  const [isFavorite, setIsFavorite] = React.useState(true);
  const { userId } = useContext(AuthContext);
  const favoriteChecker = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}favorites?customer_id[eq]=${userId}&product_id[eq]=${id}`
      );
      return response.data.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const addToFavorites = async (itemId) => {
    const response = await axios.post(`${BASE_URL}favorites`, {
      user_id: userId,
      product_id: itemId,
    });
  };

  const confirmAction = async () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Remove item from favorites",
        "Are you sure you want to remove this item?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => resolve(false),
          },
          {
            text: "Confirm",
            onPress: () => resolve(true),
          },
        ]
      );
    });
  };

  const deleteFromFavorites = async (update) => {
    const response = await axios.get(`${BASE_URL}favorites/${update}`);
    return response.data;
  };

  const getIdFromTable = async () => {
    const response = await axios.get(
      `${BASE_URL}favorites?user_id[eq]=${userId}&product_id[eq]=${itemId}`
    );
    return response.data[0].id;
  };

  const onPressFavorite = async () => {
    const checker = await favoriteChecker(itemId);
    if (checker) {
      // const getId = await getIdFromTable();
      // console.log(getId);
      console.log(checker);
    } else {
      // const add = await addToFavorites(itemId);
      // setIsFavorite(!isFavorite);
      console.log(checker);
    }
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
                  height: 20,
                  width: 20,
                  tintColor: COLORS.primary,
                }}
              />
              <Text style={{ ...FONTS.h5 }}>{item.calories} calories</Text>
            </View>
          </View>

          {/* images */}
          <View style={{ position: "absolute", top: -20, right: 15 }}>
            {/* <IconButton
              icon={isFavorite ? icons.favourite : icons.love}
              iconStyle={{
                tintColor: COLORS.primary,
                height: 25,
                width: 25,
              }}
              onPress={onPressFavorite}
            /> */}
          </View>

          <View style={{ position: "absolute", bottom: -20, right: 15 }}></View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HorizontalFoodCard;
