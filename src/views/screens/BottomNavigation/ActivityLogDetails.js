import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  dummyData,
  icons,
  images,
  COLORS,
  SIZES,
  constants,
  FONTS,
} from "../../../constants";
import { Header, LoadingActivity } from "../../components/FoodeaComponents";
import Constants from "expo-constants";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";

const ActivityLogDetails = ({ navigation, route }) => {
  const [myCartList, setMyCartList] = React.useState(null);
  const { itemValue } = route.params;
  const [data, setData] = React.useState({ id: 1, name: "chris" });
  const [isLoading, setIsLoading] = React.useState(true);
  const [dummy, setDummy] = React.useState(null);

  useEffect(() => {
    getItemTable();
  }, []);

  const getItemTable = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${BASE_URL}orders?order_key[eq]=${itemValue}`
    );
    console.log(response.data[0].order_details);
    setData(response.data[0].order_details);
    setIsLoading(false);
  };

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"Activity Details"}
        leftComponent={
          // Open Custom Drawer
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLORS.gray2,
              borderRadius: SIZES.radius,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={icons.backarrow}
              style={{
                borderRadius: SIZES.radius,
                color: COLORS.gray2,
              }}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <View
            style={{
              width: 40,
            }}
          ></View>
        }
      />
    );
  }

  return (
    <View
      style={{
        alignItems: "center",
        top: Constants.statusBarHeight - 32,
      }}
    >
      {/* Header */}
      {renderHeader()}

      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.order_key}`}
        renderItem={({ item, index }) => (
          <View>
            <Text>{item.product_details.price}</Text>
            <Text>{item.product_details.product_name}</Text>
            <Text>{item.total}</Text>
            <Text>{item.product_details.calories}</Text>
            <Text>{item.quantity}</Text>
            <Image
              style={{ width: 40, height: 40 }}
              source={{ uri: item.product_details.product_image }}
            />
          </View>
        )}
      />

      {/* <Button
        onPress={() => {
          console.log(item);
        }}
      /> */}
    </View>
  );
};

export default ActivityLogDetails;

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});
