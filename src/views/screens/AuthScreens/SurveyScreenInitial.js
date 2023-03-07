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
import { FormInput, TextButton } from "../../components/FoodeaComponents";

const SurveyScreenInitial = ({ navigation }) => {
  const [weight, setWeight] = React.useState();
  const [height, setHeight] = React.useState();

  function submitHandler() {
    navigation.replace("SurveyScreen");
  }

  function renderFormInput() {
    return (
      <View style={{ width: "80%", height: "80%", left: 30, top: 10 }}>
        <FormInput
          label={"Height"}
          value={height}
          onChange={(height) => {
            setHeight(height);
          }}
        />
        <FormInput
          label={"Weight"}
          value={weight}
          onChange={(weight) => {
            setWeight(weight);
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
        Tell us about yourself
      </Text>

      {renderFormInput()}
    </View>
  );
};

export default SurveyScreenInitial;

const styles = StyleSheet.create({});
