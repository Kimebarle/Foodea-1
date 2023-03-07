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
import OTPInputView from "@twotalltotems/react-native-otp-input";

const EnterOTP = ({ navigation }) => {
  const [timer, setTimer] = React.useState(60);

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

    return () => clearInterval(interval);
  }, []);

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
          marginTop: SIZES.padding * 2,
          marginHorizontal: SIZES.radius,
        }}
      >
        <OTPInputView
          pinCount={4}
          style={{
            width: "100%",
            height: 50,
          }}
          codeInputFieldStyle={{
            width: 65,
            height: 65,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            color: COLORS.black,
            ...FONTS.h3,
          }}
          onCodeFilled={(code) => {
            console.log(code);
          }}
        />

        {/* TIMER */}
        {renderTimer()}


        {/* Reset Password */}
        {renderResetPasswordForm()}

      </View>
    );
  }

  function renderTimer() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
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
            color: COLORS.primary,
            ...FONTS.h4,
          }}
          onPress={() => setTimer(60)}
        />
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: 'absolute',
          top: 700,
          left: 55,
        }}
      >
        <TextButton
          label="Continue"
          buttonContainerStyle={{
            height: 50,
            width: 250,
            alignItems: "center",
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          onPress={() => console.log("Continue")}
        />
      </View>
    );
  }

  function renderResetPasswordForm() {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Resetpassword")}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
            }}
          >
            Reset Password
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        height: SIZES.height,
        width: SIZES.width,
      }}>
      {/* Header */}
      {renderHeader()}

      {/* LOGO */}
      {renderLogo()}

      {/* OTP DETAILS */}
      {renderOTPDetails()}

      {/* ENTER OTP */}
      {renderOTPinputs()}

      {/* FOOTER */}
      {renderFooter()}
    </View>
  );
};

export default EnterOTP;

const styles = StyleSheet.create({});
