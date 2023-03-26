import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SIZES, FONTS, COLORS, icons, } from "../../../constants";
import { Header, TextButton } from "../../components/FoodeaComponents";
import RadioForm, {
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { RadioButton } from "react-native-paper";

const SurveyScreen = ({ navigation, route }) => {
  const { passedList4 } = route.params;
  const [value, setValue] = React.useState(0);
  const items = [
    {
      label: "Sedentary (little or no exercise)",
      value: 0,
      letter: "A",
    },
    {
      label: "Lightly Active (exercise 1 - 3 days/week",
      value: 1,
      letter: "B",
    },
    {
      label: "Moderate Activity (exercise 3 - 5 days/week)",
      value: 2,
      letter: "C",
    },
    {
      label: "Active (exercise 6 - 7 days/week)",
      value: 3,
      letter: "D",
    },
    {
      label: "Very Active (hard exercise 6 - 7 days/week)",
      value: 4,
      letter: "E",
    },
  ];

  const OnPressHandler = () => {
    const tempList5 = [...passedList4];

    const list5 = tempList5.map((item) => ({
      ...item,
      lifestyle: items[value].letter,
    }));
    // console.log(items[value].letter);
    // console.log(passedList4);
    navigation.navigate("SurveyScreenInitial", { passedList5: list5 });
  };

  function renderFooter() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          paddingBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
      >
        <TextButton
          label="Next"
          buttonContainerStyle={{
            height: 60,
            width: 250,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          onPress={OnPressHandler}
        />
      </View>
    );
  }

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        leftComponent={
          // Open Custom Drawer
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
            <Image
              source={icons.backarrow}
              style={{
                borderRadius: SIZES.radius,
                color: COLORS.gray2,
              }}
            />
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

  return (
    <View
      style={{
        alignItems: "center",
        height: SIZES.height,
        width: SIZES.width,
      }}
    >
      {/* Header */}
      {renderHeader()}

      <View style={{
        height: 600,
        width: 350,
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
      }}>



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

        <View style={{ width: "80%", marginTop: 40, left: 20 }}>
          <RadioForm
            radio_props={items}
            initial={value}
            onPress={(value) => setValue(value)}
            buttonColor={COLORS.gray3}
            labelStyle={{ ...FONTS.h4, marginBottom: SIZES.padding, }}
            selectedButtonColor={COLORS.primary}
          />
        </View>
        {renderFooter()}
      </View>
    </View>
  );
};

export default SurveyScreen;
