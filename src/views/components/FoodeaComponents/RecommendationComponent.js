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
import { Alert } from "react-native";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";

const RecommendationComponent = ({
  containerStyle,
  item,
  onPress,
  favorite,
  user_id,
}) => {
  const [isFavorite, setIsFavorite] = React.useState(favorite);

  const checkedIsFavorite = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}favorites?user_id[eq]=${user_id}&&product_id[eq]=${item.product_id}`
      );
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
        product_id: item.product_id,
      });
      setIsFavorite(!isFavorite);
      return true;
    } catch (error) {
      console.log(error);
      return false;
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
      `${BASE_URL}favorites?user_id[eq]=${user_id}&product_id[eq]=${item.product_id}`
    );
    return response.data[0].id;
  };

  const updateFavorite = async (remove) => {
    const response = await axios.delete(`${BASE_URL}favorites/${remove}`);
    return response.data;
  };

  const onPressHandler = async () => {
    const itemExist = await checkedIsFavorite();
    if (itemExist) {
      const decision = await confirmAction();
      if (decision) {
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
        console.log(decision);
      }
    } else {
      const result = await addToFavorites();
      if (result) {
        Alert.alert(
          "Success",
          "Added To Favorites",
          [{ text: "Confirm", style: "OK" }],
          { cancelable: false }
        );
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
      {/* Calories and Favorites */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* Calories */}
        <View style={{ flexDirection: "row" }}>
          <Image
            source={icons.calories}
            style={{
              height: 25,
              width: 25,
              tintColor: COLORS.primary,
            }}
          />
          <Text style={{ ...FONTS.h4 }}>{item.calories} calories</Text>
        </View>

        {/* Favorites */}
        <IconButton
          icon={isFavorite ? icons.love : icons.favourite}
          iconStyle={{
            tintColor: COLORS.primary,
            height: 25,
            width: 25,
          }}
          onPress={onPressHandler}
        />
      </View>

      {/* Image */}
      <View
        style={{
          height: 150,
          width: 150,
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <View style = {{
          alignItems: "center",
          marginTop: SIZES.padding
        }}>
          <Image
            source={{ uri: item.product_image }}
            style={{
              height: 150,
              width: 150,
            }}
          />
        </View>

        <View>
          {/* Price */}
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            ₱{item.price}
          </Text>
        </View>
      </View>

      <View style={{
        marginTop: 50
      }}>
        {/* Text */}
        <View style={{ flexDirection: "row", marginTop: SIZES.radius }}>
          <Text style={{ ...FONTS.h3, marginLeft: 5, marginRight: 30 }}>
            {item.product_name}
          </Text>
        </View>

        {/* Description */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginLeft: 5, ...FONTS.h3, color: COLORS.primary }}>
            Description
          </Text>
          <Text style={{ marginLeft: 5, fontSize: 12 }}>{item.description}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginLeft: 5, ...FONTS.h3, color: COLORS.primary }}>
            Ingredients
          </Text>
          <Text style={{ marginLeft: 5, fontSize: 12 }}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendationComponent;
