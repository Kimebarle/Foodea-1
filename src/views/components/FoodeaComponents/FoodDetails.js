import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SIZES, COLORS, icons, dummyData } from "../../../constants";
import IconButton from "./IconButton";
import { Alert } from "react-native";
import AuthContext from "../../../api/context/auth/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";

const FoodDetails = ({
  food,
  calories,
  img,
  favorite,
  product_id,
  onPress,
}) => {
  const { userId } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = React.useState(favorite);

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

  React.useEffect(() => {
    setIsFavorite(favorite);
  }, []);

  const favoriteChecker = async () => {
    const response = await axios.get(
      `${BASE_URL}favorites?product_id[eq]=${product_id}&user_id[eq]=${userId}`
    );
    //console.log(response.data);
    return response.data.length > 0;
  };

  const addToFavorites = async () => {
    const response = await axios.post(`${BASE_URL}favorites`, {
      user_id: userId,
      product_id: product_id,
    });
    return response.data.length > 0;
  };

  const deleteItemFromFavorites = async () => {
    const response = await axios.delete(`${BASE_URL}favorites/${product_id}`);
    return response.data.length > 0;
  };

  const getItem = async () => {
    const response = await axios.get(
      `${BASE_URL}favorites?product_id[eq]=${product_id}&user_id[eq]=${userId}`
    );
    return response.data[0].id;
  };

  const onPressHandler = async () => {
    const checkIfFavorite = await favoriteChecker();

    //console.log(checkIfFavorite);
    if (checkIfFavorite) {
      const decision = await confirmAction();
      if (decision) {
        setIsFavorite(false);
      } else {
        console.log("true");
      }
      // const remove = await getItem();
      // const get = await deleteItemFromFavorites(remove);
      // setIsFavorite(false);
      // console.log(get);
    } else {
      const addTo = await addToFavorites();
      setIsFavorite(true);
      // console.log(addTo);
      //console.log(addTo);
      //console.log(checkIfFavorite);
    }
  };

  return (
    <View
      style={{
        marginTop: SIZES.radius,
        marginBottom: SIZES.padding,
        paddingHorizontal: SIZES.padding,
      }}
    >
      {/* Image holder */}
      <View
        style={{
          height: 190,
          borderRadius: 15,
          backgroundColor: COLORS.white,
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: SIZES.base,
            paddingHorizontal: SIZES.radius,
          }}
        >
          {/* calories */}
          <View style={{ flexDirection: "row" }}>
            <Image source={icons.calories} style={{ width: 30, height: 30 }} />
            <Text style={{ color: COLORS.darkGray2 }}>{calories} calories</Text>
          </View>
          {/* Favorites */}
          <IconButton
            icon={favorite ? icons.love : icons.favourite}
            iconStyle={{
              tintColor: COLORS.primary,
              position: "absolute",
              height: 25,
              width: 25,
              right: 0,
            }}
            onPress={onPress}
          />
        </View>
        {/* food image */}
        <View>{img}</View>
      </View>
    </View>
  );
};

export default FoodDetails;
