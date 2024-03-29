import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  icons,
  dummyData,
  constants,
  COLORS,
  FONTS,
  SIZES,
} from "../../../constants";
import {
  FormInput,
  TextButton,
  Header,
  TextInput,
} from "../../components/FoodeaComponents";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";
import AuthContext from "../../../api/context/auth/AuthContext";

const SurveyScreenInitial = ({ navigation, route }) => {
  const { passedList5 } = route.params;
  const [question1, setQuestion1] = React.useState();
  const [wordCount, setWordCount] = React.useState();

  async function submitHandler() {
    // const press = check(question1);

    const tempList6 = [...passedList5];
    const list6 = tempList6.map((item) => ({
      ...item,
      preferences: question1,
    }));
    navigation.navigate("Captcha", { passedList6: list6 });
  }

  // const check = (question1) => {
  //   const Answer = question1;
  //   const words = Answer.split(" ");
  //   const count = words.length;
  //   return count;
  // };

  const disabledButton = () => {
    return !question1 || wordCount <= 25;
  };

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

  function renderFormInput() {
    return (
      <View style={{ width: "80%", height: 550, left: 30, top: 10 }}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <FormInput
            inputContainerStyle={{
              ...FONTS.h3,
              width: 265,
              borderRadius: SIZES.radius,
              marginBottom: SIZES.padding,
            }}
            onChange={(value) => {
              const str = value.split(" ");
              const words = str.length;
              setWordCount(words);
              setQuestion1(value);
            }}
            autoCapitalize
            value={question1}
            label="Answer"
            editable
            multiline
            numberOfLines={4}
            maxLength={500}
          />
          {/* <TextInput
            style={{
              ...FONTS.h3,
              width: 265,
              borderRadius: SIZES.radius,
              marginBottom: SIZES.padding,
            }}
            onChangeText={(value) => {
              setQuestion1(value);
            }}
            autoCapitalize
            value={question1}
            label="Answer"
            editable
            multiline
            numberOfLines={4}
            maxLength={100}
          /> */}
        </View>

        <TextButton
          label={"Submit"}
          disabled={disabledButton()}
          buttonContainerStyle={{
            height: 50,
            borderRadius: SIZES.radius,
            marginTop: SIZES.padding,
            backgroundColor: !disabledButton()
              ? COLORS.primary
              : COLORS.transparentPrimray,
          }}
          onPress={submitHandler}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        height: SIZES.height,
        width: SIZES.width,
        alignItems: "center",
      }}
    >
      {/* Header */}
      {renderHeader()}

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{
          extraHeight: 300,
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
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SurveyScreenInitial;

const styles = StyleSheet.create({});
