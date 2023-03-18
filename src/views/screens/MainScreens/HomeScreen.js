import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Text,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../api/context/auth/AuthContext";
import { Button, Container } from "../../components/FoodeaComponents";
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
  //   const { logout, user } = useContext(AuthContext);
  const { restaurantId } = route.params;
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
  const [selectedMenuType, setSelectedMenuType] = React.useState(1);
  const [trending, setTrending] = React.useState();
  const [recommends, setRecommends] = React.useState([]);
  const [menuList, setMenuList] = React.useState([]);
  const [itemId, setItemId] = React.useState("");
  const [foodId, setFoodId] = React.useState();

  // React.useEffect(() => {
  //   handleChangeCategory(selectedCategoryId, selectedMenuType);
  // }, []);

  // Handler

  const fetchFoodFromRestaurant = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}foods?merchant_id[eq]=${restaurantId}`
      );
      setTrending(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodFromRestaurant();
  }, []);

  // function handleChangeCategory(categoryId, menuTypeId) {
  //   // Retrieve the Trending Food Menu
  //   let selectedTrending = dummyData.Greenwich_menu.find(
  //     (a) => a.name == "Trending"
  //   );

  //   // Find the menu
  //   let selectedMenu = dummyData.Greenwich_menu.find((a) => a.id == menuTypeId);

  //   // Set the trending menu based on the cateroryID
  //   setTrending(
  //     selectedTrending?.list.filter((a) => a.categories.includes(categoryId))
  //   );

  //   // Set menu based on the category ID
  //   setMenuList(
  //     selectedMenu?.list.filter((a) => a.categories.includes(categoryId))
  //   );
  // }

  function onPressHandler() {}

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
          data={trending}
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
              itemId={item.id}
              // userId={userId}
              onPress={() => {
                navigation.navigate("FoodInfo", { itemValue: item.product_id });
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
        data={dummyData.Greenwich_categories}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 55,
              marginTop: SIZES.padding,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index == dummyData.categories.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor:
                selectedCategoryId == item.id
                  ? COLORS.primary
                  : COLORS.lightGray2,
            }}
            onPress={() => {
              setSelectedCategoryId(item.id);
              handleChangeCategory(item.id, selectedMenuType);
            }}
          >
            <Image
              source={item.icon}
              style={{ marginTop: 5, height: 50, width: 50 }}
            />
            <Text
              style={{
                alignSelf: "center",
                marginRight: SIZES.base,
                color:
                  selectedCategoryId == item.id ? COLORS.white : COLORS.gray,
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
        renderItem={({ item, index }) => {
          return (
            <HorizontalFoodCard
              containerStyle={{
                height: 130,
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
              onPress={onPressHandler(foodId, item.id)}
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
