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

const RecommendationComponent = ({ containerStyle, item, onPress }) => {
  const [isFavorite, setIsFavorite] = React.useState(true);
  const [isAddCart, setAddCart] = React.useState(true);

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
          icon={isFavorite ? icons.favourite : icons.love}
          iconStyle={{
            tintColor: COLORS.primary,
            height: 25,
            width: 25,
          }}
          onPress={() => setIsFavorite(!isFavorite)}
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
        <Image
          source={require("../../../../assets/img/dummyData/hamburger.png")}
          style={{
            height: 100,
            width: "100%",
          }}
        />

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
    </TouchableOpacity>
  );
};

export default RecommendationComponent;
