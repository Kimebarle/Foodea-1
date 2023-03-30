import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
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

const ActivityLogDetails = ({ navigation, route }) => {
  const { itemValue } = route.params;

  const ActivityLogDetails = ({ navigation }) => {
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
                console.log(Constants.statusBarHeight);
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

    function renderCartList() {
      return (
        <FlatList
          data={myCartList}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            paddingBottom: SIZES.padding,
          }}
          renderItem={(data) => (
            <View
              style={{
                height: 100,
                backgroundColor: COLORS.lightGray2,
                ...styles.cartItemContainer,
              }}
            >
              {/*   Food Image */}
              <View
                style={{
                  width: 90,
                  height: 100,
                  marginLeft: -10,
                }}
              >
                <Image
                  source={{}}
                  resizeMode="contain"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 1,
                  }}
                />
              </View>

              {/*   Food Info */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <Text style={{ width: 150, ...FONTS.h5, fontSize: 13 }}>
                  Product Name
                  {"\n"}
                  <Text
                    style={{
                      color: COLORS.primary,
                      ...FONTS.h3,
                    }}
                  >
                    ₱ Price
                  </Text>
                  {"\n"}
                  <Text
                    style={{
                      color: COLORS.gray,
                      ...FONTS.h5,
                    }}
                  >
                    {" "}
                    calories
                  </Text>
                  {"\n"}
                  <Text
                    style={{
                      color: COLORS.gray,
                      ...FONTS.h5,
                    }}
                  >
                    Quantity
                  </Text>
                </Text>
              </View>
            </View>
          )}
        />
      );
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        top: Constants.statusBarHeight - 32,
      }}
    >
      {/* Header */}
      {renderHeader()}

      {/* CartList */}
      {renderCartList()}
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
