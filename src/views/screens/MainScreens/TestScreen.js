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
import { BASE_URL } from "../../../api/context/auth/config";
import axios from "axios";
import { List } from "react-native-paper";

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
  const { userId } = useContext(AuthContext);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
  const [selectedMenuType, setSelectedMenuType] = React.useState(1);
  const [trending, setTrending] = React.useState([]);
  const [menuList, setMenuList] = React.useState([]);
  const [itemId, setItemId] = React.useState([]);

  const [itemsDisplay, setItemDisplay] = React.useState(null);

  React.useEffect(() => {
    getItemTable();
  }, []);

  const handleChangeCategory = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}foods?merchant_id[eq]=${id}&limit=4`
      );
      setItemDisplay(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemTable = async () => {
    try {
      const response = await axios.get(`${BASE_URL}foods?merchant_id[eq]=1`);
      setItemDisplay(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
              alignItems: "center",
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
              navigation.navigate("HomeScreen", { restaurantId: item.id });
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
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <FlatList
          data={itemsDisplay}
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
              // add a favorite component then pass the favorite value to the component
              itemId={item.product_id}
              user_id={userId}
              merchant_id={item.merchant_id}
              onPress={() => {
                navigation.navigate("FoodInfo", { itemId: item.product_id });
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
