import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import {
  Header,
  EditButton,
  TextButton,
  TextInput,
  FormInput,
  FormInputCheck,
  IconButton,
  CheckBox,
  Button,
} from "../../components/FoodeaComponents";
import {
  icons,
  SIZES,
  COLORS,
  dummyData,
  FONTS,
  images,
} from "../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import utils, { Utils } from "../../../utils/Utils";
import { useEffect, useContext } from "react";

import { SelectList } from "react-native-dropdown-select-list";
import AuthContext from "../../../api/context/auth/AuthContext";
import axios from "axios";
import sha256 from "sha256";
import { BASE_URL } from "../../../api/context/auth/config";

const EditProfile = ({ navigation, route }) => {
  const { userId, userInfo } = useContext(AuthContext);
  const [showPassword, setShowPasswod] = React.useState(true);
  const [resetshowPassword, setResetShowPasswod] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [resetpassword, setResetPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const toggleHidePassword = () => {
    setShowPasswod(!showPassword);
  };

  const togglePassword = () => {
    setResetShowPasswod(!resetshowPassword);
  };

  const disabledButton = () => {
    return !password || !resetpassword || password != resetpassword;
  };

  const generateHash = (str) => {
    return sha256(str);
  };

  const showData = () => {
    setIsLoading(true);
    //setFirstName(data.firstname);
    setIsLoading(false);
  };

  const passwordCheck = async () => {
    if (resetpassword == password) {
      return true;
    } else {
      return false;
    }
  };

  const passwordChecker = async () => {
    return password == userInfo.password;
  };

  const updatePassword = async (password, resetpassword) => {
    const hash = generateHash(password);
    // console.log(user.password);
    const response = axios.patch(`${BASE_URL}app_users/${userId}`, {
      password: hash,
    });
    console.log(response.data);
  };

  const onPressHandler = async () => {
    const passwordBeforeChecker = await passwordChecker();
    console.log(passwordBeforeChecker);
    if (passwordBeforeChecker) {
      Alert.alert(
        "Warning",
        "Cannot change to existing password",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      const update = await passwordCheck();
      if (update) {
        const updatePass = await updatePassword(password, resetpassword);
        Alert.alert(
          "Confirmation",
          "Your details have been successfully updated.",
          [
            {
              text: "Confirm",
              style: "cancel",
              onPress: () => {
                console.log("Confirm");
                navigation.navigate("AccountScreen");
              },
            },
          ]
        );
      } else {
        console.log(update);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (isLoading) {
      showData();
    }
  }, []);

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"Edit Password"}
        leftComponent={
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
            onPress={() => {
              //console.log(data);
              navigation.goBack();
            }}
          >
            <Image source={icons.backarrow} style={{ color: COLORS.gray2 }} />
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

  function renderForm() {
    return (
      <View
        style={{
          width: 350,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            marginBottom: SIZES.base,
          }}
        >
          <Text
            style={{
              width: "100%",
              lineHeight: 60,
              color: COLORS.dark,
              ...FONTS.h1,
            }}
          >
            Edit your password
          </Text>
        </View>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={"handled"}
          extraScrollHeight={-200}
          contentContainerStyle={{
            marginTop: SIZES.base,
            flexGrow: 1,
            paddingBottom: SIZES.padding * 2,
          }}
        >
          {/* Password  */}
          
            {/* <TextInput
              style={{
                ...FONTS.h3,
                width: 300,
                borderRadius: SIZES.radius,
              }}
              secureTextEntry={showPassword}
              onChangeText={setPassword}
              value={password}
              label="Password"
            /> */}
            <FormInput
              inputContainerStyle={{
                ...FONTS.h3,
                width: 300,
                borderRadius: SIZES.radius,
              }}
              value={password}
              secureTextEntry={showPassword}
              onChange={(value) => {
                setPassword(value);
              }}
              label="Password"
              appendComponent={
                <IconButton
                  icon={showPassword ? icons.eye : icons.disable_eye}
                  iconStyle={{
                    tintColor: COLORS.gray,
                    width: 20,
                    height: 20,
                    marginLeft: SIZES.base,
                    position: "absolute",
                    right: 15,
                    top: 12,
                  }}
                  onPress={toggleHidePassword}
                />
              }
            />

          {/* Re-Enter Password */}
          
            <FormInput
              inputContainerStyle={{
                ...FONTS.h3,
                width: 300,
                borderRadius: SIZES.radius,
              }}
              secureTextEntry={resetshowPassword}
              value={resetpassword}
              onChange={(value) => {
                setResetPassword(value);
              }}
              label="Confirm Password"
              appendComponent={
                <IconButton
                  icon={resetshowPassword ? icons.eye : icons.disable_eye}
                  iconStyle={{
                    tintColor: COLORS.gray,
                    width: 20,
                    height: 20,
                    marginLeft: SIZES.base,
                    position: "absolute",
                    right: 15,
                    top: 12,
                  }}
                  onPress={togglePassword}
                />
              }
            />
        </KeyboardAwareScrollView>

        <TextButton
          label="Confirm"
          disabled={disabledButton()}
          buttonContainerStyle={{
            marginBottom: SIZES.padding,
            height: 55,
            borderRadius: SIZES.radius,
            backgroundColor: !disabledButton() ? COLORS.primary : COLORS.gray,
          }}
          onPress={onPressHandler}
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

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        {/* Form */}
        {renderForm()}
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
    ...FONTS.h4,
  },
});
