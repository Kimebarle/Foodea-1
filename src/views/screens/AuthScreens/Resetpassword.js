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
  FormInput,
  FormInputCheck,
  IconButton,
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import utils, { Utils } from "../../../utils/Utils";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";
import { Alert } from "react-native";

const Resetpassword = ({ navigation, route }) => {
  const { passwordEmail } = route.params;
  const [newpassword, setNewPassword] = React.useState("");
  const [newpasswordError, setPasswordError] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");
  const [newconfirmpasswordError, setNewConfirmPasswordError] =
    React.useState("");
  const [showPassword, setShowPasswod] = React.useState(false);
  const [reshowPassword, setReShowPasswod] = React.useState(false);

  const disabledButton = () => {
    return !newpassword || !confirmpassword || newpassword != confirmpassword;
  };

  const getInfo = async () => {
    const response = await axios.get(
      `${BASE_URL}app_users?email[eq]=${passwordEmail}`
    );
    return response.data[0].user_id;
  };

  const onPressHandler = async () => {
    try {
      // wait for troy to check
      const info = await getInfo();
      const response = await axios.patch(`${BASE_URL}app_users/${info}`, {
        password: "asdasdasdasddasd",
      });
      console.log(response.data);
      Alert.alert("Success", "", [
        {
          text: "Confirm",
          onPress: () => navigation.navigate("LoginScreen"),
          style: "cancel",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  function renderEmail() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          height: SIZES.height * 0.55,
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
            Reset Password
          </Text>
          <Text
            style={{
              ...FONTS.h5,
            }}
          >
            Password must be at least 6 characters long. Password can contain
            letters, numbers and punctuation.
          </Text>

          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps={"handled"}
            extraScrollHeight={-200}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: SIZES.padding,
              justifyContent: "center",
            }}
          >
            {/* New Password */}
            <FormInput
              containerStyle={{
                borderRadius: SIZES.radius,
              }}
              label="New Password"
              value={newpassword}
              secureTextEntry={!showPassword}
              onChange={(value) => {
                setNewPassword(value);
                utils.validatePassword(value, setPasswordError);
              }}
              errorMsg={newpasswordError}
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

            {/* Confirm Password */}
            <FormInput
              containerStyle={{
                borderRadius: SIZES.radius,
              }}
              label="Confirm Password"
              value={confirmpassword}
              secureTextEntry={!reshowPassword}
              onChange={(value) => {
                setConfirmPassword(value);
                utils.validatePassword(value, setPasswordError);
              }}
              errorMsg={newconfirmpasswordError}
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
            <View
              style={{
                alignItems: "flex-end",
              }}
            ></View>
            <TextButton
              label="Sign In"
              disabled={disabledButton()}
              onPress={onPressHandler}
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
          </KeyboardAwareScrollView>
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
        title={"New Password"}
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

      {/* Logo */}
      {renderLogo()}

      {/* Email Address */}
      {renderEmail()}
    </View>
  );
};

export default Resetpassword;

const styles = StyleSheet.create({
  forgotPassword: {
    marginTop: 10,
  },
  signup_text: {},
});
