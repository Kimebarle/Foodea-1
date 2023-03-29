import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Text,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../../api/context/auth/AuthContext";

import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
  images,
} from "../../../constants";
import {
  Header,
  HorizontalFoodCard,
  VerticalFoodCard,
} from "../../components/FoodeaComponents";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";
import { useFocusEffect } from "@react-navigation/native";

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>
      </View>

      {/* Content */}
      {children}
    </View>
  );
};

const HomeScreen = ({ navigation, route }) => {
  const { userId } = useContext(AuthContext);
  const { restaurantId } = route.params;
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
  const [selectedMenuType, setSelectedMenuType] = React.useState(1);
  const [trending, setTrending] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      updateWithFavorites();
      getRestaurantCategory();
    }, [])
  );

  const getData = async () => {
    const response = await axios.get(
      `${BASE_URL}foods?merchant_id[eq]=${restaurantId}`
    );
    return response.data;
  };

  const favorites = async () => {
    const response = await axios.get(
      `${BASE_URL}favorites?user_id[eq]=${userId}`
    );
    return response.data;
  };

  const updateWithFavorites = useCallback(async () => {
    setIsLoading(true);
    const favorite = await favorites();
    const food = await getData();

    const favoritesList = [...favorite];
    const getFood = [...food];

    const updatedList = getFood.map((item) => ({
      ...item,
      isFavorite: favoritesList.some(
        (fave) => fave.product_id === item.product_id
      ),
    }));
    setTrending(updatedList);
    setIsLoading(false);
    return updatedList;
  }, []);

  const getRestaurantCategory = async () => {
    const response = await axios.get(
      `${BASE_URL}restaurants?merchant_id[eq]=${restaurantId}`
    );
    setCategoryId(response.data[0].categories);
  };

  const handleChangeCategory = async (id) => {
    const list = await updateWithFavorites();
    const update = [...list];
    const updated = update.filter((item) => item.category_id === id);
    setTrending(updated);
  };

  function renderMenuTypes() {
    return (
      <FlatList
        horizontal
        data={dummyData.Manginasal_menu}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          marginBottom: 10,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              marginLeft: SIZES.padding,
              marginRight:
                index == dummyData.menu.length - 1 ? SIZES.padding : 0,
            }}
            onPress={() => {
              // setSelectedMenuType(item.id);
              // handleChangeCategory(selectedCategoryId, item.id);
            }}
          >
            <Text
              style={{
                color:
                  selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                ...FONTS.h3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  function renderTrendingSection() {
    return (
      <Section
        title="Best Seller"
        onPress={() => console.log(" Show All Trending Near You")}
      >
        <FlatList
          data={trending.slice(0, 5)}
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
                navigation.navigate("FoodInfo", { itemId: item.product_id });
              }}
            />
          )}
        />
      </Section>
    );
  }

  function renderFoodCategories() {
    return (
      <FlatList
        data={categoryId}
        keyExtractor={(item) => `${item.category_id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              // flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: 55,
              marginTop: SIZES.padding,
              borderWidth: selectedCategoryId == item.category_id ? 2 : 0,
              borderColor:
                selectedCategoryId == item.category_id ? COLORS.primary : COLORS.white,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index == dummyData.categories.length - 1 ? SIZES.padding : 0,
              borderRadius: SIZES.radius,
              paddingHorizontal: 15,
              // borderColor:
              //   selectedCategoryId == item.category_id
              //     ? COLORS.white
              //     : COLORS.primary,
              backgroundColor:
                selectedCategoryId == item.id
                  ? COLORS.primary
                  : COLORS.lightGray2,
            }}
            onPress={() => {
              setSelectedCategoryId(item.category_id);
              handleChangeCategory(item.category_id);
            }}
          >
            {/* <Image
              source={item.icon}
              style={{ marginTop: 5, height: 50, width: 50 }}
            /> */}
            <Text
              style={{
                alignSelf: "center",
                textAlign: "center",
                color:
                  selectedCategoryId == item.id ? COLORS.white : COLORS.gray,
                ...FONTS.h3,
              }}
            >
              {item.main_category}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  function renderDeliveryTo() {
    return (
      <View
        style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.padding }}
      >
        <Text style={{ color: COLORS.primary, ...FONTS.h4 }}>DELIVER TO :</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Address")}
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.h4 }}>
            Celina Homes Camarin Caloocan City
          </Text>
          <Image
            source={icons.down_arrow}
            style={{ marginLeft: SIZES.base, height: 20, width: 20 }}
          />
        </TouchableOpacity>
      </View>
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
        title={"Restaurant"}
        leftComponent={
          // Open Custom
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
            onPress={() => navigation.navigate("Home")}
          >
            <Image source={icons.backarrow} style={{ color: COLORS.gray2 }} />
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

      {/* List */}
      <FlatList
        data={trending}
        keyExtractor={(item) => `${item.product_id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Delivery to section */}
            {renderDeliveryTo()}

            {/* Food Categories */}
            {renderFoodCategories()}

            {/* Trending Near You */}
            {renderTrendingSection()}

            {/* Menu Type */}
            {renderMenuTypes()}
          </View>
        }
        renderItem={({ item }) => {
          return (
            <HorizontalFoodCard
              containerStyle={{
                alignItems: "center",
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
              imageStyle={{
                marginTop: 20,
                height: 110,
                width: 110,
              }}
              itemId={item.product_id}
              item={item}
              onPress={() => {
                navigation.navigate("FoodInfo", { itemId: item.product_id });
              }}
            />
          );
        }}
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
export default HomeScreen;
