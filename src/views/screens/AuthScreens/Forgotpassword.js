import React from "react";
import { TouchableOpacity, StyleSheet, View, Image, Text } from "react-native";
import {
  TextInput,
  Header,
  FormInput,
  TextButton,
  FormInputCheck,
} from "../../components/FoodeaComponents";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
  images,
} from "../../../constants";
import utils, { Utils } from "../../../utils/Utils";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";
import { Alert } from "react-native";

const Forgotpassword = ({ navigation, route }) => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [checkValidEmail, setCheckValidEmail] = React.useState(false);

  const handleCheckEmail = (value) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(value);
    if (re.test(value) || regex.test(value)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  function isEnableSendEmail() {
    return email != "" && emailError == "";
  }

  const checkEmail = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}app_users?email[eq]=${email}`
      );
      console.log(response.data);
      return response.data.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const sendEmailHandler = async () => {
    const emailCheck = await checkEmail();
    if (emailCheck) {
      console.log("existing email");
      navigation.navigate("EnterOTP");
    } else {
      Alert.alert("Error", "No Existing Email", [
        {
          text: "Confirm",
          onPress: () => console.log("error"),
          style: "cancel",
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
        title={"FORGET PASSWORD"}
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

  function renderForgetDetails() {
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
          Password Recovery
        </Text>
        <Text
          style={{
            color: COLORS.gray,
            fontSize: 15,
            textAlign: "center",
            marginHorizontal: SIZES.radius,
          }}
        >
          Don't worry! It happes. Please enter your email address associated
          with your account
        </Text>
      </View>
    );
  }

  function renderFormInput() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
          backgroundColor: COLORS.white,
        }}
      >
        {/* Email */}
        <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
            }}
            label="Email"
            value={email}
            onChange={(value) => {
              handleCheckEmail(value);
              setEmail(value);
            }}
            appendComponent={
              <View
                style={{
                  position: "absolute",
                  bottom: 45,
                  right: 2,
                }}
              >
                {checkValidEmail ? (
                  <Text style={styles.textFailed}>Wrong format email</Text>
                ) : (
                  <Text style={styles.textFailed}> </Text>
                )}
              </View>
            }
          />
      </View>
    );
  }
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        height: SIZES.height,
        width: SIZES.width,
        flex: 1,
      }}
    >
      {/* Header */}
      {renderHeader()}

      {/* LOGO */}
      {renderLogo()}

      {/* Details */}
      {renderForgetDetails()}

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Form Input */}
        {renderFormInput()}

        {/* OTP SCREEN
        <TouchableOpacity onPress={() => navigation.navigate("EnterOTP")}>
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
              OTP SCREEN
            </Text>
          </View>
        </TouchableOpacity> */}
        
        {/* Button */}
        <TextButton
          label="Send Email"
          disabled={isEnableSendEmail() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: "center",
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSendEmail()
              ? COLORS.primary
              : COLORS.transparentPrimray,
            marginBottom: SIZES.padding,
          }}
          onPress={sendEmailHandler}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
    ...FONTS.h4,
  },
});

export default Forgotpassword;
