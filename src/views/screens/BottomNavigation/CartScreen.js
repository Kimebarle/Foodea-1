import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Header,
  IconButton,
  CartQuantityButton,
  StepperInput,
  FooterTotal,
} from "../../components/FoodeaComponents";
import { FONTS, SIZES, COLORS, icons, dummyData } from "../../../constants";
import { SwipeListView } from "react-native-swipe-list-view";
import axios from "axios";

import AuthContext from "../../../api/context/auth/AuthContext";
import TransactionContext from "../../../api/context/auth/TransactionContext";
import { BASE_URL } from "../../../api/context/auth/config";
import { set } from "react-native-reanimated";
import { Alert } from "react-native";

const CartScreen = ({ navigation, route }) => {
  const { restaurantID } = route.params;
  const { userInfo, userId } = useContext(AuthContext);
  const [myCartList, setMyCartList] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [price, setPrice] = React.useState(0);
  const [orderQuantity, setOrderQuantity] = React.useState(0);
  const [fee, setFee] = React.useState(0);
  const [calories, setCalories] = React.useState(0);
  const fetchCart = useCallback(async () => {
    if (userId === undefined) {
      setMyCartList(dummyData.myCart);
    } else {
      const response = await axios.get(
        `${BASE_URL}carts?restaurant_id[eq]=${restaurantID}&&customer_id[eq]=${userId}`
      );

      //console.log(response.data[0].product_details.price);

      let totalPrice = 0;
      let totalCalories = 0;
      for (let i = 0; i < response.data.length; i++) {
        const price = parseInt(response.data[i].product_details.price);
        totalPrice += price;
      }

      for (let i = 0; i < response.data.length; i++) {
        const calories = response.data[i].product_details.calories;
        totalCalories += calories;
      }
      setCalories(totalCalories);
      setPrice(totalPrice);
      setOrderQuantity(response.data.length);
      setMyCartList(response.data);
      setIsLoading(false);
    }
  }, [myCartList, fetchCart]);

  useEffect(() => {
    if (!myCartList) {
      setIsLoading(true);
      fetchCart();
    }
  }, [myCartList, fetchCart]);

  function updateQuantityHandler(newquantity, id) {
    const newMyCartList = myCartList.map((cl) =>
      cl.id === id ? { ...cl, quantity: newquantity } : cl
    );
    setMyCartList(newMyCartList);
  }

  const confirmAction = async () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Place your Order",
        "Are you sure you want to place your order?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => resolve(false),
          },
          {
            text: "OK",
            onPress: () => resolve(true),
          },
        ]
      );
    });
  };

  const onSubmitHandler = async () => {
    const decision = await confirmAction();

    if (decision) {
      for (let i = 0; i < myCartList.length; i++) {
        const response = await axios.post(`${BASE_URL}orders`, {
          customer_id: userId,
          merchant_id: restaurantID,
          product_id: myCartList[i].product_id,
          restaurant_id: restaurantID,
          quantity: myCartList[i].quantity,
          total: myCartList[i].total,
          status: "Pending",
          payment_type: "Cash",
        });
        console.log(response.data);
      }
      let newCart = [...myCartList];
      for (let i = 0; i < newCart.length; i++) {
        const response = await axios.delete(
          `${BASE_URL}carts/${newCart[i].id}`
        );
      }
      newCart.splice(0, newCart.length);
      setMyCartList(newCart);
      setCalories(0);
      setPrice(0);
      setOrderQuantity(0);
    } else {
      console.log("cancel");
    }
  };

  const showAlertWithBooleanResponse = () => {
    return new Promise((resolve) => {
      Alert.alert(
        "Do you want to remove this item from your cart?",
        "",
        [
          {
            text: "Cancel",
            onPress: () => resolve(false),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };

  async function removeMyCartHandler(id) {
    const shouldContinue = await showAlertWithBooleanResponse();

    if (shouldContinue) {
      setIsLoading(true);
      const response = await axios.delete(`${BASE_URL}carts/${id}`);
      let totalPrice = 0;
      let totalCalories = 0;
      let newMyCartList = [...myCartList];
      const index = newMyCartList.findIndex((myCart) => myCart.id === id);
      newMyCartList.splice(index, 1);
      setMyCartList(newMyCartList);
      setOrderQuantity(newMyCartList.length);
      for (let i = 0; i < newMyCartList.length; i++) {
        const price = parseInt(newMyCartList[i].product_details.price);
        totalPrice += price;
      }
      for (let i = 0; i < newMyCartList.length; i++) {
        const calories = parseInt(newMyCartList[i].product_details.calories);
        totalCalories += calories;
      }
      setPrice(totalPrice);
      setCalories(totalCalories);
      setIsLoading(false);
    } else {
      console.log(showAlertWithBooleanResponse);
    }
  }

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"CART"}
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
            onPress={() => navigation.goBack()}
          >
            <Image source={icons.backarrow} style={{ color: COLORS.gray2 }} />
          </TouchableOpacity>
        }
        rightComponent={
          // Search Component
          <View
            style={{
              width: 40,
            }}
          />
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
          paddingBottom: SIZES.padding4,
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
                source={require("../../../../assets/img/dummyData/hamburger.png")}
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
                {isLoading ? "Loading" : data.item.product_details.product_name}
                {"\n"}
                <Text
                  style={{
                    color: COLORS.primary,
                    ...FONTS.h3,
                  }}
                >
                  ₱ {isLoading ? "Loading" : data.item.product_details.price}
                </Text>
                {"\n"}
                <Text
                  style={{
                    color: COLORS.gray,
                    ...FONTS.h5,
                  }}
                >
                  {isLoading ? "Loading" : data.item.product_details.calories}{" "}
                  calories
                </Text>
              </Text>

              {/* Food Quantity
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  left: 90,
                  bottom: 10,
                }}
              >
                <StepperInput
                  value={data.item.total}
                  onAdd={() =>
                    updateQuantityHandler(data.item.total + 1, data.item.id)
                  }
                  onMinus={() => {
                    if (data.item.total > 1) {
                      updateQuantityHandler(data.item.total - 1, data.item.id);
                    }
                  }}
                />
              </View> */}
            </View>

            <IconButton
              containerStyle={{
                flex: 1,
                justifyContent: "flex-end",
                position: 'absolute',
                right: 10,
              }}
              icon={icons.Delete}
              iconStyle={{
                marginRight: 10,
                tintColor: COLORS.black,
              }}
              onPress={() => {
                removeMyCartHandler(data.item.id);
              }}
            />
          </View>
        )}
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        height: SIZES.height,
        width: SIZES.width,
      }}
    >
      {/*   Header */}
      {renderHeader()}

      {/* <Button title="Press" onPress={fetchCart} />
      <Button title="Press" onPress={fetchData} /> */}
      {/*   Cart List */}
      {renderCartList()}
      {/*   Total Cost Section */}
      <FooterTotal
        disable={myCartList}
        totalCalories={calories}
        subTotal={price}
        shippingFee={fee}
        number={orderQuantity}
        total={price + fee}
        onPress={onSubmitHandler}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});
