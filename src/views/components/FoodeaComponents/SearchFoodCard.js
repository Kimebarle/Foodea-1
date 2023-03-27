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

const SearchFoodCard = ({
  containerStyle,
  item,
  onPress,
  itemId,
  user_id,
  merchant_id,
  Favorite,
  favorite_Id,
}) => {
  const [isFavorite, setIsFavorite] = React.useState(Favorite);
  const [data, setData] = React.useState([]);
  const [favoriteId, setFavoriteId] = React.useState();
  // React.useEffect(() => {}, []);

  const checkedIsFavorite = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}favorites?user_id[eq]=${user_id}&&product_id[eq]=${itemId}`
      );

      setData(response.data);
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

  const itemRemoval = async () => {
    const response = await axios.get(
      `${BASE_URL}favorites?user_id[eq]=${user_id}&product_id[eq]=${itemId}`
    );
    return response.data[0].id;
  };

  const updateFavorite = async (remove) => {
    const response = await axios.delete(`${BASE_URL}favorites/${remove}`);
    return response.data;
  };

  const setFavorite = async () => {
    const itemExist = await checkedIsFavorite();
    if (itemExist) {
      const itemRemove = await confirmAction();
      if (itemRemove) {
        const remove = await itemRemoval();
        const update = await updateFavorite(remove);
        if (update) {
          Alert.alert("Successful", "Item Remove", [
            {
              text: "Confirm",
              onPress: () => {
                setIsFavorite(!isFavorite);
              },
              style: "cancel",
            },
          ]);
        }
      } else {
        console.log("cancel");
      }
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
    <View
      style={{
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          width: 350,
          height: 150,
          marginBottom: SIZES.radius,
          padding: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: "#FAF9F6",
          ...containerStyle,
        }}
        onPress={onPress}
      >
        {/* Favorites */}
        <IconButton
          icon={isFavorite ? icons.love : icons.favourite}
          iconStyle={{
            tintColor: COLORS.primary,
            height: 25,
            width: 25,
            position: "absolute",
            right: 10,
            top: 5,
          }}
          onPress={setFavorite}
        />

        <View
          style={{
            flexDirection: "row",
          }}
        >
          {/* Image */}
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: item.product_image }}
              style={{
                width: 130,
                height: 130,
              }}
            />
          </View>

          {/* Info */}
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              ₱ {item.price}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {item.product_name}
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchFoodCard;
