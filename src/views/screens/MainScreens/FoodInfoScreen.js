import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import {
  Header,
  CartQuantityButton,
  FoodDetails,
  IconLabel,
  IconButton,
  StepperInput,
  LineDivider,
  Ratings,
  TextButton,
} from "../../components/FoodeaComponents";
import {
  icons,
  SIZES,
  COLORS,
  dummyData,
  FONTS,
  images,
} from "../../../constants";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { BASE_URL } from "../../../api/context/auth/config";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../../api/context/auth/AuthContext";

const FoodInfoScreen = ({ navigation, route }) => {
  const { addToCart, userId } = useContext(AuthContext);
  const { itemId } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const [quantity, setQuantity] = React.useState(1);
  const [displayFood, setDisplayFood] = React.useState(null);
  const [product_id, setProduct_Id] = React.useState();
  const [customer_id, setCustomer_Id] = React.useState();
  const [restaurant_id, setRestaurant_Id] = React.useState();
  const [quantity_product, setQuantity_Product] = React.useState(1);
  const [total, setTotal] = React.useState(1);
  const [price, setPrice] = React.useState(1);
  const [ingredients, setIngredients] = React.useState();
  const [image, setImage] = React.useState();
  const [favorite, setFavorite] = React.useState();

  // declare variable that would be used inside the function
  const fetchFood = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}foods?product_id[eq]=${itemId}`
      );
      const data = await response.data;
      const product = await response.data[0].product_id;
      const rest_id = await response.data[0].merchant_id;
      const price_id = await response.data[0].price;
      const ingredients = await response.data[0].ingredients;
      const image = await response.data[0].product_image;
      setImage(image);
      setProduct_Id(product);
      setPrice(price_id);
      setRestaurant_Id(rest_id);
      setIngredients(ingredients);
      setDisplayFood(data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFavorite = async () => {
    const getFood = await fetchFood();
    const response = await axios.get(
      `${BASE_URL}favorites?user_id[eq]=${userId}`
    );
    const foodItem = [...getFood];
    const list = response.data;
    const fave = [...list];
    const isFavorite = foodItem.some((item1) =>
      fave.some((item2) => item2.product_id === item1.product_id)
    );
    setFavorite(isFavorite);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchFavorite();
    fetchFood();
  }, []);

  function buyNowHandler() {
    console.log(userId, product_id, restaurant_id, quantity_product, total);
    addToCart(userId, product_id, restaurant_id, quantity, total);
    navigation.navigate("Cart");
  }

  function renderRestaurant() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
      >
        {/* <Image
          source={images.jollibee_logo}
          style={{
            width: 50,
            height: 50,
            borderRadius: SIZES.radius,
          }}
        /> */}
        {/* info */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                ...FONTS.h3,
                alignItems: "center",
                top: 8,
              }}
            >
              Quantity
            </Text>
          </View>

          <View
            style={{
              marginLeft: 120,
            }}
          >
            <StepperInput
              value={quantity}
              onAdd={() => setQuantity(quantity + 1)}
              onMinus={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 70,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius,
          backgroundColor: COLORS.transparent,
        }}
      >
        {/* Text Button */}
        <TextButton
          disabled={isLoading ? true : false}
          onPress={buyNowHandler}
          buttonContainerStyle={{
            flex: 1,
            flexDirection: "row",
            height: 60,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          label="Buy Now"
          label2={isLoading ? "$15.99" : "₱ " + quantity * price + ".00"}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, height: SIZES.height, width: SIZES.width }}>
      {/* header section */}
      <Header
        containerStyle={{
          height: 80,
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"Hamburger"}
        leftComponent={
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
            onPress={() => navigation.goBack()}
          >
            <Image source={icons.backarrow} style={{ color: COLORS.gray2 }} />
          </TouchableOpacity>
        }
        // rightComponent={
        //   {}
        //   // Search Component
        //   // <CartQuantityButton quantity={3} />
        // }
      />

      {/* contents */}
      <ScrollView
        style={{
          marginTop: SIZES.base,
        }}
      >
        {/* food info */}
        <FoodDetails
          calories={isLoading ? "Loading" : displayFood[0].calories}
          product_id={isLoading ? 5 : displayFood[0].product_id}
          favorite={isLoading ? favorite : favorite}
          img={
            <Image
              source={
                isLoading
                  ? require("../../../../assets/img/dummyData/hamburger.png")
                  : { uri: displayFood[0].product_image }
              }
              resizeMode="contain"
              style={{ width: 250, height: 150, alignSelf: "center" }}
            />
          }
        />
        {/* restaurant info */}
        <View
          style={{
            marginTop: SIZES.base,
          }}
        >
          <Text style={{ ...FONTS.h1, marginHorizontal: SIZES.padding }}>
            {isLoading ? "Loading" : displayFood[0].product_name}
          </Text>
          <Text
            style={{
              marginTop: SIZES.base,
              color: COLORS.darkGray,
              textAlign: "justify",
              ...FONTS.h3,
              paddingHorizontal: SIZES.padding,
              marginBottom: SIZES.base,
            }}
          >
            {isLoading ? "Loading" : displayFood[0].description}
          </Text>

          <LineDivider />

          <Text
            style={{
              ...FONTS.h2,
              paddingHorizontal: SIZES.padding,
              marginTop: SIZES.base,
            }}
          >
            {/* ingredients */}
            Ingredients
          </Text>
          <Text
            style={{
              marginTop: SIZES.base,
              color: COLORS.darkGray,
              textAlign: "justify",
              ...FONTS.h3,
              paddingHorizontal: SIZES.padding,
              marginBottom: SIZES.base,
            }}
          >
            {isLoading ? dummyData.hamburger.ingredients : ingredients}
          </Text>

          <LineDivider />
        </View>

        {/* Restaurant Ratings */}
        {renderRestaurant()}

        <LineDivider />
      </ScrollView>

      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default FoodInfoScreen;

const styles = StyleSheet.create({});
