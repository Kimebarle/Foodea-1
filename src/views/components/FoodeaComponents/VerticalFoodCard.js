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
  merchant_id,
  Favorite,
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [data, setData] = React.useState([]);

  const checkFavorites = async () => {
    const responseFavorite = await axios.get(
      `${BASE_URL}favorites?user_id[eq]=${user_id}`
    );
    // setIsFavorite();
    const responseFood = await axios.get(
      `${BASE_URL}foods?merchant_id[eq]=${merchant_id}`
    );

    const foods = responseFood.data;
    const favorite = responseFavorite.data;

    // console.log(favorite[0].product_id);

    const updatedFoods = foods.map((food) => {
      const isCheck = favorite.some(
        (favorite) => favorite.product_id === food.product_id
      );
    });

    //setData(response.data);

    // const isCheck = data.some((favorite) => favorite.product_id === item.id);
    //setIsFavorite(isCheck);
    //console.log(item.product_id);
  };

  React.useEffect(() => {
    checkFavorites();
  }, []);

  const checkedIsFavorite = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}favorites?user_id[eq]=${user_id}&&product_id[eq]=${itemId}`
      );

      //
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
      console.log(item.product_id);
      // Alert.alert("Warning", "Item is already Favorited", [
      //   {
      //     text: "Confirm",
      //     onPress: () => console.log("Item Already is Favorite"),
      //     style: "cancel",
      //   },
      // ]);
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
            <Image
              source={icons.calories}
              style={{
                height: 25,
                width: 25,
                tintColor: COLORS.primary,
              }}
            />
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
        <Text style={{ color: COLORS.primary, textAlign: "center", ...FONTS.h2 }}>
          ₱ {item.price}
        </Text>
        <Text style={{ ...FONTS.h3 }}>{item.product_name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalFoodCard;
