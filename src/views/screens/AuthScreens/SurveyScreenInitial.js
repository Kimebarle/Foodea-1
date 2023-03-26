import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import {
  icons,
  dummyData,
  constants,
  COLORS,
  FONTS,
  SIZES,
} from "../../../constants";
import { FormInput, TextButton } from "../../components/FoodeaComponents";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";
import AuthContext from "../../../api/context/auth/AuthContext";

const SurveyScreenInitial = ({ navigation, route }) => {
  const { passedList5 } = route.params;
  const [question1, setQuestion1] = React.useState();

  async function submitHandler() {
    const tempList6 = [...passedList5];

    const list6 = tempList6.map((item) => ({
      ...item,
      preferences: question1,
    }));

    navigation.navigate("Captcha", { passedList6: list6 });
  }

  function renderFormInput() {
    return (
      <View style={{ width: "80%", height: "80%", left: 30, top: 10 }}>
        <FormInput
          label={"Answer"}
          value={question1}
          onChange={(question1) => setQuestion1(question1)}
          inputContainerStyle={{
            borderWidth: 2,
            borderColor: COLORS.primary,
            borderRadius: SIZES.radius,
          }}
        />
        <TextButton
          label={"Submit"}
          buttonContainerStyle={{
            height: 50,
            borderRadius: SIZES.radius,
            marginTop: SIZES.padding,
          }}
          onPress={submitHandler}
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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 350,
          height: 550,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
        }}
      >
        <Text
          style={{
            paddingTop: SIZES.padding,
            paddingLeft: SIZES.padding,
            ...FONTS.h1,
            marginTop: SIZES.radius,
          }}
        >
          Tell us about your preferences
        </Text>
        <Text style={{ padding: SIZES.padding, ...FONTS.h4 }}>
          Describe your food preferences or what you like in words. Use keywords
          related to your food likings such as: taste of food (spicy, sweet,
          etc.), name of food (fried chicken, burger, etc. ) or ingredients
          (cheese, milk, etc.). Use english words only and it should be atleast
          20 words.{" "}
        </Text>

        {renderFormInput()}
      </View>
    </View>
  );
};

export default SurveyScreenInitial;

const styles = StyleSheet.create({});
