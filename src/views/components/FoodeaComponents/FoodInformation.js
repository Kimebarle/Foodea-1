import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { icons, SIZES, COLORS, images, dummyData } from "../../../constants";

const FoodInformation = ({
  image,
  description,
  price,
  distance,
  location,
  ingredients,
}) => {
  return (
    <View>
      <Image source={item.image} />
    </View>
  );
};

export default FoodInformation;

const styles = StyleSheet.create({});
