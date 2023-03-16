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
    <View style={{}}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          borderRadius: 15,
          backgroundColor: "#FAF9F6",
          ...containerStyle,
        }}
        onPress={onPress}
      >
        {/* image */}
        <Image
          source={require("../../../../assets/img/dummyData/hamburger.png")}
          style={imageStyle}
        />
        <View style={{ flex: 1 }}>
          {/* price */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginLeft: 5,
            }}
          >
            ₱ {item.price}
          </Text>

          {/* name */}
          <Text style={{ fontSize: 15.5, fontWeight: "bold", marginLeft: 5 }}>
            {item.product_name}
          </Text>

          {/* distance and waiting time */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Image source={icons.location} style = {{
              height: 20,
              width: 20, 
              marginRight: 5,
            }}/>
            <Text style={{ marginRight: 10 }}>2 km</Text>
            <Image source={icons.Waiting_Time} style = {{
              marginRight: 5,
            }}/>
            <Text style={{ marginRight: 20 }}>40 mins</Text>
          </View>

          {/* images */}
          <View style={{ position: 'absolute', top: -10, right: 15 }}>
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

          <View style={{ position: "absolute", top: 59, right: 15 }}>
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
