import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Header,
  IconButton,
  FormInput,
  CardItem,
  FooterTotal,
} from "../../components/FoodeaComponents";
import {
  icons,
  SIZES,
  COLORS,
  dummyData,
  FONTS,
  images,
} from "../../../constants";
import AuthContext from "../../../api/context/auth/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";
import { Alert } from "react-native";

const CheckOut = ({ navigation, route }) => {
  const { userId, userInfo } = useContext(AuthContext);
  const [coupon, setCoupon] = React.useState();
  const [totalPrice, setTotalPrice] = React.useState(5);
  const [fee, setFee] = React.useState(50);
  const [calories, setCalories] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [userData, setUserData] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [discount, setDiscount] = React.useState(0);
  const [button, setButton] = React.useState(false);
  const { passedValues } = route.params;

  React.useEffect(() => {
    setIsLoading(true);
    getUser();
    getTotal();
    let { selectedCard } = route.params;
    setSelectedCard(selectedCard);
    //console.log(userInfo);
  }, []);

  const getUser = async () => {
    setIsLoading(true);
    const response = await axios.get(`${BASE_URL}app_users/${userId}`);
    setUserData(response.data);
    setIsLoading(false);
  };

  const getTotal = async () => {
    const list = [...passedValues];
    let totalCalories = 0;
    let totalPrice = 0;
    list.forEach((item) => {
      totalPrice += item.product_details.price * item.quantity;
      totalCalories += item.product_details.calories * item.quantity;
    });
    setCalories(totalCalories);
    setTotalPrice(totalPrice);
  };

  const getVouchers = async () => {
    const response = await axios.get(
      `${BASE_URL}vouchers?merchant_id[eq]=${passedValues[0].restaurant_id}`
    );
    // console.log(passedValues[0].restaurant_id);
    return response.data;
  };

  const getVoucher = (coupon, list2) => {
    const list = [...list2];
    const updated = list.find((voucher) => voucher.voucher_code === coupon);
    return updated ? updated : false;
  };

  const handleVoucher = async () => {
    const voucher = await getVouchers();
    const list2 = [...voucher];
    const check = getVoucher(coupon, list2);
    if (check) {
      setButton(true);
      setDiscount(check.discount);
    } else {
      Alert.alert("Voucher not Available", "try another one", [
        {
          text: "Confirm",
          onPress: () => {},
        },
      ]);
      setButton(false);
    }

    // if (check.status) {
    //   console.log(check.updated.voucher_code[0]);
    // } else {

    // }
    // console.log(coupon);
  };

  const confirmAction = async () => {
    return new Promise((resolve, reject) => {
      Alert.alert("Are you sure about your order?", "Place your order?", [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => resolve(false),
        },
        {
          text: "Confirm",
          onPress: () => resolve(true),
        },
      ]);
    });
  };

  const addToOrders = async (list1) => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const otpString = randomNumber.toString().padStart(6, "0");
    for (let i = 0; i < passedValues.length; i++) {
      const response = await axios.post(`${BASE_URL}orders`, {
        customer_id: userId,
        merchant_id: list1[i].restaurant_id,
        product_id: list1[i].product_id,
        restaurant_id: list1[i].restaurant_id,
        quantity: list1[i].quantity,
        total:
          fee / passedValues.length +
          (list1[i].total - discount / passedValues.length),
        status: "Pending",
        payment_type: "Cash",
        latitude: 0,
        longitude: 0,
        order_key: `${userData[0].firstname}` + otpString,
      });
      console.log(response.data);
    }
    // console.log(list1);
  };

  const deleteFromCarts = async () => {
    for (let i = 0; i < passedValues.length; i++) {
      const response = await axios.delete(
        `${BASE_URL}carts/${passedValues[i].id}`
      );
    }
  };

  const onPressHandler = async () => {
    const list1 = [...passedValues];
    const decision = await confirmAction();
    if (decision) {
      const add = await addToOrders(list1);
      const deleteCart = await deleteFromCarts();
      navigation.navigate("Success");
    } else {
      console.log(decision);
    }
  };

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"CHECK OUT"}
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
          <View
            style={{
              width: 40,
            }}
          ></View>
        }
      />
    );
  }

  function renderCards() {
    return (
      <View>
        {selectedCard &&
          dummyData.myCard.map((item, index) => {
            return (
              <CardItem
                key={`CardPayment-${item.id}`}
                item={item}
                isSelected={
                  `${selectedCard?.key}-${selectedCard?.id}` ==
                  `CardPayment-${item.id}`
                }
                disabled={
                  `${selectedCard?.key}-${selectedCard?.id}` ==
                  `CardPayment-${item.id}`
                }
                onPress={() => setSelectedCard({ ...item, key: "CardPayment" })}
              />
            );
          })}
      </View>
    );
  }

  function renderDeliveryAddress() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          Delivery Address
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.radius,
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            borderWidth: 2,
            borderRadius: SIZES.radius,
            borderColor: COLORS.lightGray2,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {}}
          >
            <Image
              source={icons.pinlocation}
              style={{
                width: 40,
                height: 40,
                tintColor: COLORS.black,
              }}
            />
            <Text
              style={{ marginLeft: SIZES.radius, width: "85%", ...FONTS.h3 }}
            >
              {isLoading ? "address" : userData[0].address}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderCoupon() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h3 }}>Add Coupon</Text>

        <FormInput
          inputContainerStyle={{
            marginTop: 0,
            paddingLeft: SIZES.padding,
            paddingRight: 0,
            borderWidth: 2,
            borderColor: COLORS.lightGray2,
            backgroundColor: COLORS.white,
            overflow: "hidden",
          }}
          value={coupon}
          onChange={(value) => {
            setCoupon(value);
          }}
          placeholder="Coupon Code"
          appendComponent={
            <TouchableOpacity
              onPress={() => {
                handleVoucher();
              }}
              disabled={button}
            >
              <View
                style={{
                  width: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: button ? COLORS.gray : COLORS.primary,
                }}
              >
                <Image
                  source={icons.coupon}
                  style={{
                    width: 40,
                    height: 40,
                    tintColor: COLORS.white,
                  }}
                />
              </View>
            </TouchableOpacity>
          }
        />
      </View>
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
      {/* Header */}
      {renderHeader()}

      {/* Body */}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        extraScrollHeight={-200}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 20,
        }}
      >
        {/* My Cards */}
        {renderCards()}

        {/* Delivery Address */}
        {renderDeliveryAddress()}

        {/* Coupon */}
        {renderCoupon()}
      </KeyboardAwareScrollView>

      <FooterTotal
        subTotal={totalPrice}
        disable={true}
        shippingFee={fee}
        total={totalPrice - discount}
        onPress={onPressHandler}
        number={passedValues.length}
        totalCalories={calories}
      />
    </View>
  );
};

export default CheckOut;
