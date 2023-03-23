import React from "react";
import { View, Text, Platform, Image } from "react-native";

import LineDivider from "./LineDivider";
import TextButton from "./TextButton";
import { FONTS, SIZES, COLORS, icons, dummyData } from "../../../constants";

const FooterTotal = ({
  subTotal,
  shippingFee,
  total,
  onPress,
  number,
  totalCalories,
  disable,
}) => {
  return (
    <View>
      {/* Order Details */}
      <View
        style={{
          padding: SIZES.padding,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderWidth: 1,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        {/* Sub Total */}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={{ flex: 1, ...FONTS.h3 }}>Sub Total</Text>
          <Text style={{ ...FONTS.h3 }}>₱{subTotal.toFixed(2)}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
          }}
        >
          <Text style={{ flex: 1, ...FONTS.h3 }}>Total Calories</Text>
          <Image
            source={icons.calories}
            style={{ width: 25, height: 25, tintColor: COLORS.gray }}
          />
          <Text style={{ ...FONTS.h3 }}>{totalCalories}</Text>
        </View>

        {/* Shipping Fee */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
            marginBottom: SIZES.base,
          }}
        >
          <Text style={{ flex: 1, ...FONTS.h3 }}>Shipping Fee</Text>
          <Text style={{ ...FONTS.h3 }}>₱{shippingFee.toFixed(2)}</Text>
        </View>

        {/* Quantity Details */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: SIZES.padding,
          }}
        >
          <Text style={{ flex: 1, ...FONTS.h3 }}>Number of Orders</Text>
          <Text style={{ ...FONTS.h3 }}>{number}</Text>
        </View>

        {/* Line Divider */}
        <LineDivider />

        {/* Total */}
        <View style={{ flexDirection: "row", marginTop: SIZES.padding }}>
          <Text style={{ flex: 1, ...FONTS.h2 }}>Total</Text>
          <Text style={{ ...FONTS.h2 }}>₱{total.toFixed(2)}</Text>
        </View>

        {/* Button */}
        <TextButton
          disabled={disable == null || disable.length === 0}
          buttonContainerStyle={{
            height: 60,
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: disable == null || disable.length === 0 ? COLORS.gray : COLORS.primary,
          }}
          label="Place your order"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default FooterTotal;
