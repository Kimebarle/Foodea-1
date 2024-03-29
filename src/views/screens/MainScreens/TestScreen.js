import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Text,
} from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import AuthContext from "../../../api/context/auth/AuthContext";
import { COLORS, FONTS, SIZES, icons, dummyData } from "../../../constants";
import { Header, VerticalFoodCard } from "../../components/FoodeaComponents";
import { BASE_URL } from "../../../api/context/auth/config";
import axios from "axios";
import { List } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

const TestScreen = ({ navigation }) => {
  const { userId, user } = React.useContext(AuthContext);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(2);
  const [trending, setTrending] = React.useState([]);
  const [menuList, setMenuList] = React.useState([]);
  const [itemId, setItemId] = React.useState([]);
  const [favoritesDisplay, setFavoritesDisplay] = React.useState();
  const [itemsDisplay, setItemDisplay] = React.useState();
  const [foodDisplay, setFoodDisplay] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [restaurantData, setRestaurantData] = React.useState();
  const [dummy, setDummy] = React.useState();

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      updatedList();
      getRestaurant();
    }, [])
  );

  const getFood = async () => {
    const response = await axios.get(`${BASE_URL}foods`);
    return response.data;
  };

  const getFavorites = async () => {
    const response = await axios.get(
      `${BASE_URL}favorites?user_id[eq]=${user.user_id}`
    );
    return response.data;
  };

  const updatedList = useCallback(async () => {
    setIsLoading(true);
    const favorites = await getFavorites();
    const food = await getFood();
    const favoritesList = [...favorites];
    const foodList = [...food];
    const updatedWithFavorites = foodList.map((item) => ({
      ...item,
      isFavorite: favoritesList.some(
        (fave) => fave.product_id === item.product_id
      ),
    }));
    setItemDisplay(updatedWithFavorites);
    setIsLoading(false);
    return updatedWithFavorites;
  }, []);

  const handleChangeCategory = async (itemId) => {
    const list = await updatedList();
    const update = [...list];
    const updatedListFavorites = update.filter(
      (item) => item.merchant_id === itemId
    );

    setItemDisplay(updatedListFavorites);
  };

  const getRestaurant = async () => {
    const response = await axios.get(`${BASE_URL}restaurants`);
    setRestaurantData(response.data);
  };

  function search() {
    navigation.push("Search");
  }

  function renderOtherRestaurant() {
    return (
      <FlatList
        data={restaurantData}
        keyExtractor={(item) => `${item.merchant_id}`}
        vertical
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 100,
              marginLeft: SIZES.padding,
              marginRight: SIZES.padding,
              marginBottom: SIZES.base,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
            }}
            onPress={() => {
              // setItemId(item.merchant_id);
              console.log(item.merchant_id);
              navigation.navigate("HomeScreen", {
                restaurantId: item.merchant_id,
              });
            }}
          >
            <Image
              source={{ uri: item.documents.logo }}
              style={{
                marginTop: 5,
                height: 75,
                width: 75,
                alignSelf: "center",
                marginRight: SIZES.radius,
              }}
            />

            <View
              style={{
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  marginRight: SIZES.base,
                  color: COLORS.black,
                  ...FONTS.h2,
                }}
              >
                {item.business_name}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    ...FONTS.h5,
                    fontSize: 10,
                    color: COLORS.gray,
                  }}
                >
                  {item.label} • {item.food} • {item.type}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  // DISCOUNT

  // BEST SELLER ON EACH RESTAURANT
  function renderTrendingSection() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <FlatList
          data={isLoading ? dummy : itemsDisplay}
          keyExtractor={(item) => `${item.product_id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <VerticalFoodCard
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : 18,
                marginRight: index == trending.length - 1 ? SIZES.padding : 0,
              }}
              item={item}
              userId={userId}
              Favorite={item.isFavorite}
              favorite_Id={item.favoriteId + 0}
              itemId={item.product_id}
              user_id={userId}
              merchant_id={item.merchant_id}
              onPress={() => {
                navigation.navigate("FoodInfo", {
                  itemId: item.product_id,
                  isFavorite: item.isFavorite,
                  foodImage: { uri: item.product_image },
                  key: Date.now(),
                });
                console.log(item.product_id);
              }}
            />
          )}
        />
      </View>
    );
  }

  // RESTAURANT CATEGORIES
  function renderFoodCategories() {
    return (
      <FlatList
        data={dummyData.Restaurant}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 100,
              marginTop: SIZES.padding,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              borderWidth: selectedCategoryId == item.id ? 2 : 0,
              borderColor:
                selectedCategoryId == item.id ? COLORS.primary : COLORS.white,
              marginRight:
                index == dummyData.Restaurant.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2,
            }}
            onPress={() => {
              handleChangeCategory(item.id);
              setSelectedCategoryId(item.id);
            }}
          >
            <Image
              source={item.icon}
              style={{
                marginTop: 5,
                height: 75,
                width: 75,
                alignSelf: "center",
                marginRight: SIZES.radius,
              }}
            />

            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  alignSelf: "center",
                  marginRight: SIZES.base,
                  color: COLORS.primary,
                  ...FONTS.h3,
                }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <View style={styles.topcontainer}>
      {/* Header */}
      <Header
        containerStyle={{
          height: 80,
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"Home"}
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
            onPress={() => navigation.navigate("AccountScreen")}
          >
            <Image
              source={icons.My_Profile}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.gray,
                borderRadius: SIZES.radius,
              }}
            />
          </TouchableOpacity>
        }
        rightComponent={
          // Search Component
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
            onPress={search}
          >
            <Image style={{ width: 20, height: 20 }} source={icons.search} />
          </TouchableOpacity>
        }
      />

      {/* List */}
      <FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* RESTAURANTS CATEGORIES */}
            {renderFoodCategories()}

            {/* BEST SELLER ON EACH RESTAURANT */}
            {renderTrendingSection()}

            {/* Other Restaurant Label */}
            <View
              style={{
                marginLeft: SIZES.padding,
                marginTop: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                }}
              >
                Other Restaurant
              </Text>
            </View>

            {/* Other Restaurant */}
            {renderOtherRestaurant()}
          </View>
        }
        // renderItem={({ item, index }) => {
        //   return <View></View>;
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topcontainer: {
    flex: 1,
    height: SIZES.height,
    width: SIZES.width,
  },
});
export default TestScreen;
