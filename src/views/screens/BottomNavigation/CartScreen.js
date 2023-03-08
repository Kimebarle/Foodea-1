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

const CartScreen = ({ navigation, containerStyle, item, imageStyle }) => {
  const { userInfo, userId } = useContext(AuthContext);
  const [myCart, setMyCart] = React.useState(null);
  const [productId, setProductId] = React.useState(null);
  const [myCartList, setMyCartList] = React.useState(null);
  const [itemId, setItemId] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const fetchCart = useCallback(async () => {
    if (userId === undefined) {
      setMyCartList(dummyData.myCart);
    } else {
      const response = await axios.get(
        `${BASE_URL}carts?customer_id[eq]=${userId}`
      );
      const data = await response.data;
      // console.log(response.data[0].product_id);
      console.log(response.data);
      setMyCartList(data);
      setIsLoading(false);
      console.log(userId);
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

  function removeMyCartHandler(id) {
    let newMyCartList = [...myCartList];
    const index = newMyCartList.findIndex((myCart) => myCart.id === id);
    newMyCartList.splice(index, 1);
    setMyCartList(newMyCartList);
  }

  function CardPayment() {
    navigation.push("CardPayment");
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
      <SwipeListView
        data={myCartList}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding4,
        }}
        disableRightSwipe={true}
        rightOpenValue={-75}
        renderItem={(data, rowMap) => (
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
                  top: 10,
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
              <Text style={{ width: 150, ...FONTS.h5, fontSize: 14 }}>
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
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <IconButton
            containerStyle={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: COLORS.primary,
              ...styles.cartItemContainer,
            }}
            icon={icons.Delete}
            iconStyle={{
              marginRight: 10,
              tintColor: COLORS.white,
            }}
            onPress={() => {
              setItemId(data.item.id);
              console.log(data.item.id);
              removeMyCartHandler(data.item.id);
            }}
          />
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
        subTotal={37.97}
        shippingFee={0.0}
        number={2}
        total={37.97}
        onPress={() => navigation.navigate("CardPayment")}
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
