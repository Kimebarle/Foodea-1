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

const CheckOut = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const [coupon, setCoupon] = React.useState();
  const [totalPrice, setTotalPrice] = React.useState(5);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const { passedValues } = route.params;
  React.useEffect(() => {
    getTotal();
    let { selectedCard } = route.params;
    setSelectedCard(selectedCard);
  }, []);

  const getTotal = () => {
    const list = [...passedValues];

    let totalPrice = 0;
    list.forEach((item) => {
      totalPrice += item.product_details.price * item.quantity;
    });
    setTotalPrice(totalPrice);
    console.log(totalPrice);
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
            onPress={() => { }}
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
              {user.address}
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
            <TouchableOpacity>
              <View style={{
                width: 60,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
              }}>

                <Image
                  source={icons.coupon}
                  style={{
                    width: 40,
                    height: 40,
                    tintColor: COLORS.white
                  }} />
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
        shippingFee={0.0}
        total={totalPrice}
        onPress={() => navigation.replace("Success")}
      />
    </View>
  );
};

export default CheckOut;
