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
  const { pass3 } = route.params;
  const [question1, setQuestion1] = React.useState();
  const { register } = useContext(AuthContext);

  async function submitHandler() {
    //const response = await axios.get(`${BASE_URL}app_users?firstname[eq]=Juan`);
    const data = pass3.map((item) => ({ ...item, preferences: question1 }));

    register(data);
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
        (cheese, milk, etc.). Use english words only and it should be atleast 20
        words.{" "}
      </Text>

      {renderFormInput()}
    </View>
  );
};

export default SurveyScreenInitial;

const styles = StyleSheet.create({});
