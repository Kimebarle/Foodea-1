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

const FoodInfoScreen = ({ item, navigation, route, itemValue }) => {
  const { addToCart, userId } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const productId = 5;
  const [quantity, setQuantity] = React.useState();
  const [displayFood, setDisplayFood] = React.useState(null);
  const [product_id, setProduct_Id] = React.useState();
  const [customer_id, setCustomer_Id] = React.useState();
  const [restaurant_id, setRestaurant_Id] = React.useState();
  const [quantity_product, setQuantity_Product] = React.useState(1);
  const [total, setTotal] = React.useState(1);
  const [prod, setProd] = React.useState();

  // declare variable that would be used inside the function
  const fetchFood = async () => {
    try {
      const response = await axios.get(`${BASE_URL}foods?product_id[eq]=7`);
      const data = await response.data;
      const product = await response.data[0].product_id;
      //const custom_id = await response.data[0].customer_id;
      const rest_id = await response.data[0].merchant_id;
      const qty_id = await response.data[0].stock;
      // const total_id = await response.data[0].total;

      setProduct_Id(product);
      console.log(userId);
      setDisplayFood(data);
      setRestaurant_Id(rest_id);
      setQuantity_Product(qty_id);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    //console.log(displayFood[0].product_details.product_name);
    //console.log(displayFood);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchFood();
  }, []);

  function buyNowHandler() {
    console.log(userId, product_id, restaurant_id, quantity_product, total);
    addToCart(userId, product_id, restaurant_id, quantity_product, total);
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
        <Image
          source={images.jollibee_logo}
          style={{
            width: 50,
            height: 50,
            borderRadius: SIZES.radius,
          }}
        />
        {/* info */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: COLORS.gray, ...FONTS.h4 }}>Restaurant</Text>
          <Text style={{ color: COLORS.gray, ...FONTS.h4 }}>
            1.2 km away from you
          </Text>
        </View>

        {/* Ratings */}
        <Ratings
          rating={4}
          iconStyle={{
            marginLeft: 3,
            width: 13,
          }}
        />
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
          label2="$15.99"
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, height: SIZES.height, width: SIZES.width }}>
      {/* header section */}
      <Header
        containerStyle={{
          height: 50,
          paddingHorizontal: SIZES.padding,
          marginTop: 10,
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
        rightComponent={
          // Search Component
          <CartQuantityButton quantity={3} />
        }
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
          img={
            <Image
              source={require("../../../../assets/img/dummyData/hamburger.png")}
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
            {dummyData.hamburger.ingredients}
          </Text>

          <LineDivider />

          {/* Distance, Duration */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              paddingBottom: 10,
              justifyContent: "space-evenly",
            }}
          >
            {/* Distance */}
            <IconLabel
              containerStyle={{}}
              icon={icons.location}
              iconStyle={{
                tintColor: COLORS.gray,
              }}
              label="1.7m"
            />

            {/* Duration */}
            <IconLabel
              containerStyle={{
                marginRight: 1,
              }}
              icon={icons.Waiting_Time}
              label="35 mins"
            />

            {/* Add or Minus Quantity */}

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

        <LineDivider />
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
