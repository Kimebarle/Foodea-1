import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import {
  TextButton,
  IconButton,
  Header,
  TextInput,
  FormInput,
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import utils, { Utils } from "../../../utils/Utils";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";
import { Alert } from "react-native";

const Email = ({ navigation, route }) => {
  const [passwordError, setPasswordError] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [phoneNumberError, setPhoneNumberError] = React.useState("");
  const [reenterpassword, setReEnterPassword] = React.useState("");
  const [reenterpasswordError, setReEnterPasswordError] = React.useState("");
  const [reshowPassword, setReShowPasswod] = React.useState(false);
  const { passedList3 } = route.params;
  const [email, setEmail] = React.useState("");
  const [resetshowPassword, setResetShowPasswod] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [resetpassword, setResetPassword] = React.useState("");
  const [checkValidEmail, setCheckValidEmail] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showPassword, setShowPasswod] = React.useState(false);


  const toggleHidePassword = () => {
    setShowPasswod(!showPassword);
  };

  const togglePassword = () => {
    setResetShowPasswod(!resetshowPassword);
  };

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

  const disabledButton = () => {
    return !email || !password || !resetpassword;
  };

  const emailChecker = async () => {
    const response = await axios.get(`${BASE_URL}app_users?email[eq]=${email}`);
    return response.data.length > 0;
  };

  const handleSignUpPress = async () => {
    const result = await emailChecker();

    if (result) {
      Alert.alert(
        "Error",
        "Existing Email Already",
        [
          {
            text: "OK",
            onPress: () => {
              // Code to handle confirmation
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      const tempList4 = [...passedList3];

      const list4 = tempList4.map((item) => ({
        ...item,
        email: email,
        password: password,
        phone: phoneNumber,
      }));
      navigation.navigate("SurveyScreen", { passedList4: list4 });
    }
  };

  function renderDetails() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          height: 600,
        }}
      >
        <View
          style={{
            flex: 1,
            width: SIZES.width - SIZES.padding * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            elevation: 5,
          }}
        >
          <Text
            style={{
              width: "100%",
              color: COLORS.black,
              ...FONTS.h1,
            }}
          >
            Input your information
          </Text>
          <Text
            style={{
              ...FONTS.h5,
            }}
          >
            Input your Email, Password, Confirm Password.
          </Text>

          {/* Email */}
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: SIZES.radius,
                marginTop: SIZES.radius,
              }}
            >
              {/* Email */}

              <FormInput
                inputContainerStyle={{
                  ...FONTS.h3,
                  width: 280,
                  borderRadius: SIZES.radius,
                }}
                autoCapitalize
                label="Email"
                value={email}
                onChange={(value) => {
                  handleCheckEmail(value);
                  setEmail(value);
                }}
                roundness={10}
              />

              <View
                style={{
                  position: "absolute",
                  bottom: 35,
                  right: 2,
                }}
              >
                {checkValidEmail ? (
                  <Text style={styles.textFailed}>Wrong format email</Text>
                ) : (
                  <Text style={styles.textFailed}> </Text>
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              marginBottom: SIZES.radius,
            }}
          >
            <FormInput
              inputContainerStyle={{
                ...FONTS.h3,
                width: 280,
                borderRadius: SIZES.radius,
              }}
              onChange={(value) => {
                setPhoneNumber(value);
                utils.validateInput(value, 11, setPhoneNumberError);
              }}
              errorMsg={phoneNumberError}
              keyboardType="number-pad"
              value={phoneNumber}
              label="+63 Phone Number"
              maxLength={11}
              roundness={10}
            />
          </View>

          {/* Password  */}
          <View
            style={{
              alignItems: "center",
            }}
          >
            <FormInput
              containerStyle={{
                borderRadius: SIZES.radius,
                width: 280,
              }}
              autoCapitalize
              label="Password"
              value={password}
              secureTextEntry={!showPassword}
              onChange={(value) => {
                setPassword(value);
                utils.validatePassword(value, setPasswordError);
              }}
              errorMsg={passwordError}
              appendComponent={
                <IconButton
                  icon={showPassword ? icons.disable_eye : icons.eye}
                  iconStyle={{
                    tintColor: COLORS.gray,
                    width: 20,
                    height: 20,
                    marginLeft: SIZES.base,
                    position: "absolute",
                    right: 0,
                    top: 12,
                  }}
                  onPress={() => setShowPasswod(!showPassword)}
                />
              }
            />
          </View>

          {/* Re-Enter Password */}
          <View
            style={{
              alignItems: "center",
            }}
          >
            <FormInput
              containerStyle={{
                borderRadius: SIZES.radius,
                width: 280,
              }}
              autoCapitalize
              label="Re-Enter Password"
              value={resetpassword}
              secureTextEntry={!reshowPassword}
              password={password}
              onChange={(value) => {
                setResetPassword(value);
                utils.validatePassword(value, setReEnterPasswordError);
              }}
              errorMsg={reenterpasswordError}
              appendComponent={
                <IconButton
                  icon={reshowPassword ? icons.disable_eye : icons.eye}
                  iconStyle={{
                    tintColor: COLORS.gray,
                    width: 20,
                    height: 20,
                    marginLeft: SIZES.base,
                    position: "absolute",
                    right: 0,
                    top: 12,
                  }}
                  onPress={() => setReShowPasswod(!reshowPassword)}
                />
              }
            />
          </View>

          <TextButton
            label="Next"
            disabled={disabledButton()}
            onPress={handleSignUpPress}
            buttonContainerStyle={{
              marginTop: SIZES.padding,
              height: 55,
              borderRadius: SIZES.radius,
              backgroundColor: !disabledButton()
                ? COLORS.primary
                : COLORS.transparentPrimray,
            }}
            labelStyle={{
              ...FONTS.h3,
            }}
          />
        </View>
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

      {/* Logo
            {renderLogo()} */}

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{
          extraHeight: 400,
        }}
      >
        {/* Email Address */}
        {renderDetails()}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Email;

const styles = StyleSheet.create({
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
    position: "absolute",
    bottom: 10,
    ...FONTS.h5,
  },
});
