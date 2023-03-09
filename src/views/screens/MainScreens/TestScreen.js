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

        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: COLORS.primary, ...FONTS.h4 }}>Show All</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {children}
    </View>
  );
};

const TestScreen = ({ navigation }) => {
  const { logout, user } = useContext(AuthContext);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
  const [selectedMenuType, setSelectedMenuType] = React.useState(1);
  const [discountType, setDiscountType] = React.useState(1);
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(1);
  const [trending, setTrending] = React.useState([]);
  const [recommends, setRecommends] = React.useState([]);
  const [menuList, setMenuList] = React.useState([]);
  const [restaurant, setRestaurant] = React.useState([]);
  const [itemId, setItemId] = React.useState([]);
  const [isAddCart, setAddCart] = React.useState(true);

  React.useEffect(() => {
    handleChangeCategory(
      selectedCategoryId,
      selectedMenuType,
      discountType,
      selectedRestaurant
    );
  }, []);

  // Handler

  function handleChangeCategory(categoryId, menuTypeId, restaurantId) {
    // Retrieve the Trending Food Menu
    let selectedTrending = dummyData.menu_restaurant.find(
      (a) => a.name == "All Food"
    );

    // Find the menu
    let selectedMenu = dummyData.menu_restaurant.find(
      (a) => a.id == menuTypeId
    );

    // Find the restaurant
    let selectedRestaurant = dummyData.other_restaurant.find(
      (a) => a.id == restaurantId
    );

    // Set the trending menu based on the cateroryID
    setTrending(
      selectedTrending?.list.filter((a) => a.categories.includes(categoryId))
    );

    // Set menu based on the category ID
    setMenuList(
      selectedMenu?.list.filter((a) => a.categories.includes(categoryId))
    );

    // Set restaurant based on the category ID
    setRestaurant(
      selectedMenu?.list.filter((a) => a.categories.includes(categoryId))
    );
  }

  function foodinfo() {
    navigation.push("FoodInfo");
  }
  function search() {
    navigation.push("Search");
  }

  function renderOtherRestaurant() {
    return (
      <FlatList
        data={dummyData.other_restaurant}
        keyExtractor={(item) => `${item.id}`}
        vertical
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 100,
              width: 300,
              marginLeft: SIZES.padding,
              marginRight: SIZES.padding,
              marginBottom: SIZES.base,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
            }}
            onPress={() => {
              setItemId(item.id);
              console.log(item.id);
              navigation.navigate("HomeScreen");
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
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.base,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.gray,
                  }}
                >
                  {item.time} mins • {item.distance} km
                </Text>
              </View>

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
  function renderMenuTypes() {
    return (
      <FlatList
        horizontal
        data={dummyData.Discount}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          marginBottom: 10,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 70,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index == dummyData.Discount.length - 1 ? SIZES.padding : 0,
              borderWidth: 1,
              borderColor: COLORS.primary,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
              elavation: 5,
            }}
            onPress={() => {
              setItemId(item.id);
              console.log(item.id);
            }}
          >
            <Image
              source={item.icon}
              style={{
                marginTop: 5,
                height: 40,
                width: 40,
                alignSelf: "center",
                marginRight: SIZES.radius,
                tintColor: COLORS.primary,
              }}
            />
            <Text
              style={{
                color: COLORS.primary,
                alignSelf: "center",
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

  // BEST SELLER ON EACH RESTAURANT
  function renderTrendingSection() {
    return (
      <Section
        title="Best Seller!"
        onPress={() => console.log(" Show All Trending Near You")}
      >
        <FlatList
          data={trending}
          keyExtractor={(item) => `${item.id}`}
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
              onPress={() => {
                setItemId(item.id);
                navigation.navigate("FoodInfo", { itemValue: itemId });
              }}
            />
          )}
        />
      </Section>
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
              setSelectedCategoryId(item.id);
              handleChangeCategory(item.id, selectedMenuType);
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
              <Text style={{ color: COLORS.black, ...FONTS.h4 }}>
                {item.distance} km
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
            {/* Delivery to section
            {renderDeliveryTo()} */}

            {/* RESTAURANTS CATEGORIES */}
            {renderFoodCategories()}

            {/* BEST SELLER ON EACH RESTAURANT */}
            {renderTrendingSection()}

            {/* DISCOUNT LABEL */}
            <View
              style={{
                marginLeft: SIZES.padding,
                marginTop: SIZES.padding,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                }}
              >
                Discounts
              </Text>
            </View>

            {/* DISCOUNT */}
            {renderMenuTypes()}

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
        renderItem={({ item, index }) => {
          return <View></View>;
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
export default TestScreen;
