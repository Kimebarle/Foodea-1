import { StyleSheet, Text, View } from "react-native";
import React from "react";

import {
  icons,
  dummyData,
  constants,
  COLORS,
  FONTS,
  SIZES,
} from "../../../constants";
// import { FormInput, TextButton } from "../../components/FoodeaComponents";
import { FormInput, TextButton } from "../../components/FoodeaComponents";
import AuthContext from "../../../api/context/auth/AuthContext";
import { useContext } from "react";

const SurveyCalories = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [calories, setCalories] = React.useState();

  function submitHandler() {
    setLogin;
  }

  function renderFormInput() {
    return (
      <View style={{ width: "80%", height: "80%", left: 30, top: 10 }}>
        <FormInput
          label={"Calories"}
          value={calories}
          onChange={(height) => {
            setCalories(height);
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
      <Text style={{ padding: SIZES.padding, ...FONTS.h2 }}>
        Let us know about your yourself ...{" "}
      </Text>

      <Text
        style={{
          paddingTop: SIZES.padding,
          paddingLeft: SIZES.padding,
          ...FONTS.h3,
        }}
      >
        How much Calories do you take in a day?
      </Text>

      {renderFormInput()}
    </View>
  );
};

export default SurveyCalories;

const styles = StyleSheet.create({});
