import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  SIZES,
  FONTS,
  COLORS,
  icons,
  dummyData,
  constants,
} from "../../../constants";

import { Header, TextButton } from "../../components/FoodeaComponents";

import Checkbox from "expo-checkbox";

const SurveyScreen = ({ navigation }) => {
  const [isChecked, setIsChecked] = React.useState({
    chicken: false,
    Fish: false,
    Pork: false,
    Beef: false,
    Dairy: false,
    Desserts: false,
    jollibee: false,
    mcdo: false,
    kfc: false,
    manginasal: false,
  });

  function renderMeatSection() {
    return (
      <View style={{ paddingHorizontal: SIZES.padding }}>
        <Text style={{ paddingTop: SIZES.padding, ...FONTS.h3 }}>
          What kind of Foods do you like?
        </Text>
        <View
          style={{
            paddingTop: SIZES.padding / 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginRight: 20, width: 30, height: 30 }}
            value={isChecked.chicken}
            onValueChange={() =>
              setIsChecked({ ...isChecked, chicken: !isChecked.chicken })
            }
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={{ ...FONTS.h4 }}>Chicken</Text>
        </View>
        <View
          style={{
            paddingTop: SIZES.padding / 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginRight: 20, width: 30, height: 30 }}
            value={isChecked.Pork}
            onValueChange={() =>
              setIsChecked({ ...isChecked, Pork: !isChecked.Pork })
            }
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={{ ...FONTS.h4 }}>Pork</Text>
        </View>
        <View
          style={{
            paddingTop: SIZES.padding / 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginRight: 20, width: 30, height: 30 }}
            value={isChecked.Beef}
            onValueChange={() =>
              setIsChecked({ ...isChecked, Beef: !isChecked.Beef })
            }
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={{ ...FONTS.h4 }}>Beef</Text>
        </View>
        <View
          style={{
            paddingTop: SIZES.padding / 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginRight: 20, width: 30, height: 30 }}
            value={isChecked.Dairy}
            onValueChange={() =>
              setIsChecked({ ...isChecked, Dairy: !isChecked.Dairy })
            }
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={{ ...FONTS.h4 }}>Dairy</Text>
        </View>
        <View
          style={{
            paddingTop: SIZES.padding / 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginRight: 20, width: 30, height: 30 }}
            value={isChecked.Desserts}
            onValueChange={() =>
              setIsChecked({ ...isChecked, Desserts: !isChecked.Desserts })
            }
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={{ ...FONTS.h4 }}>Pizza</Text>
        </View>
      </View>
    );
  }

  function renderRestaurantSection() {
    return (
      <View style={{ paddingLeft: SIZES.padding }}>
        <View
          style={{
            paddingTop: SIZES.padding / 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginRight: 20, width: 30, height: 30 }}
            value={isChecked.jollibee}
            onValueChange={() =>
              setIsChecked({ ...isChecked, jollibee: !isChecked.jollibee })
            }
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={{ ...FONTS.h4 }}>Jollibee</Text>
        </View>
        <View
          style={{
            paddingTop: SIZES.padding / 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginRight: 20, width: 30, height: 30 }}
            value={isChecked.mcdo}
            onValueChange={() =>
              setIsChecked({ ...isChecked, mcdo: !isChecked.mcdo })
            }
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={{ ...FONTS.h4 }}>McDonalds</Text>
        </View>
        <View
          style={{
            paddingTop: SIZES.padding / 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginRight: 20, width: 30, height: 30 }}
            value={isChecked.kfc}
            onValueChange={() =>
              setIsChecked({ ...isChecked, kfc: !isChecked.kfc })
            }
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={{ ...FONTS.h4 }}>KFC</Text>
        </View>
        <View
          style={{
            paddingTop: SIZES.padding / 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginRight: 20, width: 30, height: 30 }}
            value={isChecked.manginasal}
            onValueChange={() =>
              setIsChecked({ ...isChecked, manginasal: !isChecked.manginasal })
            }
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={{ ...FONTS.h4 }}>Mang Inasal</Text>
        </View>
      </View>
    );
  }

  function submitFunction() {
    console.log(isChecked);
    navigation.navigate("SurveyCalories");
  }

  function renderFooter() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          paddingBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TextButton
          label="Submit"
          buttonContainerStyle={{
            position: "absolute",
            height: 60,
            width: 250,
            left: 30,
            top: 70,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          onPress={submitFunction}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        padding: SIZES.padding,
        height: SIZES.height,
        width: SIZES.width,
      }}
    >
      {/* {renderHeader()} */}
      <Text style={{ padding: SIZES.padding, ...FONTS.h2 }}>
        Let us know about your preferences ...{" "}
      </Text>
      {renderMeatSection()}
      <Text
        style={{
          paddingTop: SIZES.padding,
          paddingLeft: SIZES.padding,
          ...FONTS.h3,
        }}
      >
        Restaurants the you like
      </Text>
      {renderRestaurantSection()}

      {renderFooter()}
    </View>
  );
};

export default SurveyScreen;
