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

const EditProfile = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const [showPassword, setShowPasswod] = React.useState(true);
  const [resetshowPassword, setResetShowPasswod] = React.useState(true);

  const [password, setPassword] = React.useState("");
  const [resetpassword, setResetPassword] = React.useState("");
  const [firstname, setFirstName] = React.useState("");

  const [checkValidEmail, setCheckValidEmail] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const toggleHidePassword = () => {
    setShowPasswod(!showPassword);
  };

  const togglePassword = () => {
    setResetShowPasswod(!resetshowPassword);
  };

  const disabledButton = () => {
    return !password || !resetpassword;
  };

  const showData = () => {
    setIsLoading(true);
    //setFirstName(data.firstname);
    setIsLoading(false);
  };

  const passwordCheck = async () => {
    if (user.password == password) {
      return true;
    } else {
      return false;
    }
  };

  const onPressHandler = async () => {
    const passwordBeforeChecker = await passwordCheck();
    // console.log(passwordBeforeChecker);
    if (passwordBeforeChecker) {
      Alert.alert(
        "Warning",
        "Cannot change to existing password",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
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
          <View
            style={{
              flexDirection: "row",
              marginBottom: SIZES.radius,
            }}
          >
            <TextInput
              style={{
                ...FONTS.h3,
                width: 300,
                borderRadius: SIZES.radius,
              }}
              secureTextEntry={showPassword}
              onChangeText={setPassword}
              value={password}
              label="Password"
            />

            <IconButton
              icon={showPassword ? icons.eye : icons.disable_eye}
              iconStyle={{
                tintColor: COLORS.gray,
                width: 20,
                height: 20,
                marginLeft: SIZES.base,
                position: "absolute",
                right: 15,
                top: 20,
              }}
              onPress={toggleHidePassword}
            />
          </View>

          {/* Re-Enter Password */}
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TextInput
              style={{
                ...FONTS.h3,
                width: 300,
                borderRadius: SIZES.radius,
              }}
              secureTextEntry={resetshowPassword}
              onChangeText={setResetPassword}
              value={resetpassword}
              label="Confirm Password"
            />

            <IconButton
              icon={resetshowPassword ? icons.eye : icons.disable_eye}
              iconStyle={{
                tintColor: COLORS.gray,
                width: 20,
                height: 20,
                marginLeft: SIZES.base,
                position: "absolute",
                right: 15,
                top: 20,
              }}
              onPress={togglePassword}
            />
          </View>
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
          onPress={() => console.log("Saved Details")}
        />
      </View>
    );
  }

  function renderImage() {
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
          source={require("../../../../assets/img/images/Sample.png")}
          resizeMode="contain"
          style={{
            width: 130,
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
