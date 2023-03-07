import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SIZES, COLORS, icons, dummyData } from "../../../constants";
import IconButton from "./IconButton";

const FoodDetails = ({ food, calories, img }) => {
  const [isFavorite, setIsFavorite] = React.useState(true);
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
          backgroundColor: COLORS.lightGray2,
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
            icon={isFavorite ? icons.favourite : icons.love}
            iconStyle={{
              tintColor: COLORS.primary,
              position: "absolute",
              height: 25,
              width: 25,
              right: 0,
            }}
            onPress={() => setIsFavorite(!isFavorite)}
          />
        </View>
        {/* food image */}
        <View>{img}</View>
      </View>
    </View>
  );
};

export default FoodDetails;
