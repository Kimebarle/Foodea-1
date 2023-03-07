import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { FONTS } from "../../../../src/constants";

const Header = ({ containerStyle, title, leftComponent, rightComponent }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        ...containerStyle,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      {/* left */}
      {leftComponent}

      {/* title */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          // paddingTop: StatusBar.currentHeight,
        }}
      >
        <Text style={{ ...FONTS.h3 }}>{title}</Text>
      </View>

      {rightComponent}
    </View>
  );
};

export default Header;
