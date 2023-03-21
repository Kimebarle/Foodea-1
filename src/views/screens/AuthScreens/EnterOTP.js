import { TouchableOpacity, StyleSheet, View, Image, Text } from "react-native";
import {
  TextInput,
  TextButton,
  Header,
} from "../../components/FoodeaComponents";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
  images,
} from "../../../constants";
import React, { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert } from "react-native";
import { sendGridEmail } from "react-native-sendgrid";

import { apiKey } from "../../../api/context/auth/config";

const EnterOTP = ({ navigation, route }) => {
  const { emailValue, otpValue } = route.params;
  const [otp, setOtp] = React.useState("");
  const [timer, setTimer] = React.useState(5);
  const [otpGenerate, setOtpGenerate] = React.useState("default");
  const [newOtp, setNewOtp] = React.useState();
  const FROMEMAIL = "foodea.bscs@gmail.com";
  const TOEMAIL = emailValue;
  const SENDGRIDAPIKEY = apiKey;

  const disabledButton = () => {
    return !otp;
  };

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);
    //console.log("first" + otpGenerate);

    // generateOtp();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const generateOtp = () => {
    setTimer(60);
    const randomNumber = Math.floor(Math.random() * 1000000);
    const otpString = randomNumber.toString().padStart(6, "0");
    setNewOtp(otpString);
    console.log(otpString);

    const SUBJECT = "OTP FOR PASSWORD RESET";
    const BODY = `Your OTP is ${otpString}`;

    const sendRequest = sendGridEmail(
      SENDGRIDAPIKEY,
      TOEMAIL,
      FROMEMAIL,
      SUBJECT,
      BODY
    );
  };

  const onPressHandler = async () => {
    //const newOtp = generateOtp();
    let value = otpValue;
    if (value == otp || newOtp == otp) {
      let user_email = emailValue;
      console.log(user_email);
      navigation.navigate("Resetpassword", { passwordEmail: user_email });
    } else {
      Alert.alert("Warning", "Your OTP code is not correct", [
        {
          text: "Confirm",
          onPress: () => {
            // handle confirmation here
          },
        },
      ]);
    }
  };

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"ENTER OTP"}
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

  function renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: SIZES.padding,
        }}
      >
        <Image
          source={images.Foodea_new_logo}
          resizeMode="contain"
          style={{
            width: 200,
          }}
        />
      </View>
    );
  }

  function renderOTPDetails() {
    return (
      <View
        style={{
          alignItems: "center",
          marginTop: SIZES.padding,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          OTP Authentication
        </Text>
        <Text
          style={{
            color: COLORS.gray,
            fontSize: 15,
            textAlign: "center",
            marginHorizontal: SIZES.radius,
          }}
        >
          An authentication code has been sent to your number.
        </Text>
      </View>
    );
  }

  function renderOTPinputs() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
        }}
      >
        <TextInput
          label="Enter OTP"
          value={otp}
          maxLength={6}
          keyboardType="number-pad"
          placeholderTextColor={COLORS.gray}
          onChangeText={(value) => setOtp(value)}
          style={{
            textAlign: "center",
          }}
        />

        {/* TIMER */}
        {renderTimer()}
      </View>
    );
  }

  function renderTimer() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: SIZES.radius,
          marginBottom: SIZES.padding,
        }}
      >
        <Text
          style={{
            color: COLORS.darkGray,
            ...FONTS.h4,
          }}
        >
          Didn't receive the code?
        </Text>

        <TextButton
          label={`Resend (${timer}s)`}
          disabled={timer == 0 ? false : true}
          buttonContainerStyle={{
            marginLeft: SIZES.base,
            backgroundColor: null,
          }}
          labelStyle={{
            color: COLORS.gray,
            ...FONTS.h4,
          }}
          onPress={generateOtp}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        height: SIZES.height,
        width: SIZES.width,
      }}
    >
      {/* Header */}
      {renderHeader()}

      {/* LOGO */}
      {renderLogo()}

      {/* OTP DETAILS */}
      {renderOTPDetails()}

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* ENTER OTP */}
        {renderOTPinputs()}

        <TextButton
          label="Continue"
          disabled={disabledButton()}
          buttonContainerStyle={{
            height: 50,
            marginTop: SIZES.padding,
            alignItems: "center",
            borderRadius: SIZES.radius,
            marginBottom: SIZES.padding,
            backgroundColor: !disabledButton() ? COLORS.primary : COLORS.gray,
          }}
          onPress={onPressHandler}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EnterOTP;

const styles = StyleSheet.create({});
