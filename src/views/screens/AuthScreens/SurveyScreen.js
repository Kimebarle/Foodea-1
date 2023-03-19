import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SIZES, FONTS, COLORS } from "../../../constants";

import { Header, TextButton } from "../../components/FoodeaComponents";
import RadioForm, {
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { RadioButton } from "react-native-paper";

const SurveyScreen = ({ navigation }) => {
  const [value, setValue] = React.useState(0);
  const items = [
    {
      label: "Sedentary (little or no exercise)",
      value: 0,
    },
    {
      label: "Lightly Active (exercise 1 - 3 days/week",
      value: 1,
    },
    {
      label: "Moderate Activity (exercise 3 - 5 days/week)",
      value: 2,
    },
    {
      label: "Active (exercise 6 - 7 days/week)",
      value: 3,
    },
    {
      label: "Very Active (hard exercise 6 - 7 days/week)",
      value: 4,
    },
  ];

  function submitFunction() {
    console.log(items[value].label);
    navigation.navigate("SurveyScreenInitial");
  }

  function renderChoices() {
    return <View></View>;
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
          label="Next"
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
        Let us know about yourself ...{" "}
      </Text>

      <Text
        style={{
          paddingTop: SIZES.padding,
          paddingLeft: SIZES.padding,
          ...FONTS.h3,
        }}
      >
        How active are you?
      </Text>

      <View style={{ width: "80%", marginTop: 40 }}>
        <RadioForm
          radio_props={items}
          initial={value}
          onPress={(value) => setValue(value)}
          buttonColor={COLORS.gray3}
          labelStyle={{ ...FONTS.h5 }}
          selectedButtonColor={COLORS.primary}
        />
      </View>
      {renderFooter()}
    </View>
  );
};

export default SurveyScreen;
