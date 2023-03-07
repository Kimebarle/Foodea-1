import React from "react";
import { View, Text } from "react-native";
import IconButton from "./IconButton";
import { FONTS, COLORS, icons, SIZES } from "../../../constants";

const StepperInput = ({ containerStyle, value = 1, onAdd, onMinus }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 40,
        width: 120,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
    >
      <IconButton
        containerStyle={{
          width: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
        icon={icons.minus}
        iconStyle={{
          height: 40,
          width: 40,
          tintColor: value > 1 ? COLORS.primary : COLORS.gray,
        }}
        onPress={onMinus}
      />

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            ...FONTS.h5,
            size: 12,
          }}
        >
          {value}
        </Text>
      </View>

      <IconButton
        containerStyle={{
          width: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
        icon={icons.plus}
        iconStyle={{
          height: 15,
          width: 15,
          tintColor: COLORS.primary,
        }}
        onPress={onAdd}
      />
    </View>
  );
};

export default StepperInput;
