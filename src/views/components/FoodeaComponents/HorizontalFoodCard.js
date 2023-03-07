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

const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress }) => {
  const [isFavorite, setIsFavorite] = React.useState(true);

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
        <Image source={item.image} style={imageStyle} />
        <View style={{ flex: 1 }}>
          {/* price */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            ₱ {item.price}
          </Text>

          {/* name */}
          <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: "bold" }}>
            {item.name}
          </Text>

          {/* distance and waiting time */}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Image source={icons.location} />
            <Text style={{ marginRight: 10 }}>{item.distance} km</Text>
            <Image source={icons.Waiting_Time} />
            <Text style={{ marginRight: 20 }}>{item.time} mins</Text>
          </View>

          {/* images */}
          <View style={{ position: "absolute", top: 0, right: 23 }}>
            <IconButton
              icon={isFavorite ? icons.favourite : icons.love}
              iconStyle={{
                tintColor: COLORS.primary,
                position: "absolute",
                height: 25,
                width: 25,
                top: 0,
                right: 0,
              }}
              onPress={() => setIsFavorite(!isFavorite)}
            />
          </View>

          <View style={{ position: "absolute", top: 59, right: 23 }}>
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
