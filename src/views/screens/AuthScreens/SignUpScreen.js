import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React from "react";
import {
  SafeAreaView,
  Header,
  TextButton,
  FormInput,
  IconButton,
  CheckBox,
  FormInputCheck,
} from "../../components/FoodeaComponents";
import {
  images,
  constants,
  SIZES,
  COLORS,
  icons,
  FONTS,
} from "../../../constants";
import utils, { Utils } from "../../../utils/Utils";
import { useContext } from "react";
import AuthContext from "../../../api/context/auth/AuthContext";
import { SelectList } from "react-native-dropdown-select-list";
import { BASE_URL } from "../../../api/context/auth/config";
import axios from "axios";
import { Alert } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [showPassword, setShowPasswod] = React.useState(false);
  const [reshowPassword, setReShowPasswod] = React.useState(false);
  const [firstname, setFirstName] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState("");
  const [middlename, setMiddleName] = React.useState("");
  const [middleNameError, setMiddleNameError] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [height, setHeight] = React.useState(100);
  const [heightError, setHeightError] = React.useState("");
  const [weight, setWeight] = React.useState(10);
  const [weightError, setWeightError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [reenterpassword, setReEnterPassword] = React.useState("");
  const [reenterpasswordError, setReEnterPasswordError] = React.useState("");
  const [termsChecked, setTermsChecked] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const [genderError, setGenderError] = React.useState("");
  const [bmi, setBmi] = React.useState(25);
  const [dummyHeight, setDummyHeight] = React.useState(170);
  const [dummyWeight, setDummyWeight] = React.useState(80);
  const [disableButton, setDisableButton] = React.useState(true);

  const { register } = useContext(AuthContext);

  const [selected, setSelected] = React.useState("");
  const data = [
    { key: "M", value: "Male" },
    { key: "F", value: "Female" },
  ];

  const checkIfRegistered = async (email) => {
    try {
      const response = await axios.get(
        `${BASE_URL}app_users?email[eq]=${email}`
      );
      return response.data.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const registerUser = async () => {
    try {
      const response = await axios.post(`${BASE_URL}app_users`, {
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        height: 100,
        weight: 50,
        gender: "M",
        address: "Test",
        contact_number: "090123123123",
        bmi: 123,
        email: email,
        password: password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleCreateAccount = async () => {
    const userExist = await checkIfRegistered(email);
    if (userExist) {
      Alert.alert("Error Sign Up", "Existing Email", [
        {
          text: "Confirm",
          onPress: () => console.log("Confirm"),
          style: "cancel",
        },
      ]);
    } else {
      const newUser = await registerUser();
      if (newUser) {
        Alert.alert("Sign Up", "Successful", [
          {
            text: "Confirm",
            onPress: () => navigation.navigate("LoginScreen"),
            style: "cancel",
          },
        ]);
      } else {
        console.log("error register");
      }
    }
  };

  const disabledButton = () => {
    return (
      !password ||
      !email ||
      !firstname ||
      !middlename ||
      !lastname ||
      password != reenterpassword
    );
  };

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"Sign Up"}
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

  function renderSignupForm() {
    return (
      <View
        style={{
          flex: 1,
          width: 350,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            width: "100%",
            lineHeight: 45,
            color: COLORS.dark,
            ...FONTS.h1,
          }}
        >
          Enter your details
        </Text>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={"handled"}
          extraScrollHeight={-200}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: SIZES.padding * 2,
          }}
        >
          {/* First Name and Second Name and Last Name */}
          <View
            style={{
              marginTop: SIZES.radius,
            }}
          >
            <FormInput
              label="First Name"
              value={firstname}
              maxLength={15}
              containerStyle={{
                flex: 1,
              }}
              onChange={(value) => {
                utils.validateInput(value, 1, setFirstNameError);
                setFirstName(value);
              }}
              errorMsg={firstNameError}
              appendComponent={
                <FormInputCheck value={firstname} error={firstNameError} />
              }
            />

            {/* MIDDLE NAME */}
            <FormInput
              label="Middle Name"
              value={middlename}
              containerStyle={{
                flex: 1,
              }}
              onChange={(value) => {
                utils.validateInput(value, 1, setMiddleNameError);
                setMiddleName(value);
              }}
              errorMsg={middleNameError}
              appendComponent={
                <FormInputCheck value={middlename} error={middleNameError} />
              }
            />

            {/* LAST NAME */}
            <FormInput
              label="Last Name"
              value={lastname}
              containerStyle={{
                flex: 1,
              }}
              onChange={(value) => {
                utils.validateInput(value, 1, setLastNameError);
                setLastName(value);
              }}
              errorMsg={lastNameError}
              appendComponent={
                <FormInputCheck value={lastname} error={lastNameError} />
              }
            />
          </View>

          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.h3,
              fontSize: 15,
            }}
          >
            Gender
          </Text>

          <SelectList
            data={data}
            label="Gender"
            placeholder={"Select Gender"}
            setSelected={setSelected}
            boxStyles={{
              backgroundColor: COLORS.lightGray2,
              borderWidth: 0,
            }}
          />

          {/* Height and Weight */}
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
            }}
          >
            <FormInput
              label="Height"
              value={height}
              placeholder="cm"
              keyboardType="number-pad"
              maxLength={3}
              containerStyle={{
                flex: 1,
              }}
              onChange={(value) => {
                utils.validateInput(value, 1, setHeightError);
                //setHeight(value);
                console.log(height);
              }}
            />

            <FormInput
              label="Weight"
              value={weight}
              maxLength={2}
              placeholder="kg"
              keyboardType="number-pad"
              containerStyle={{
                flex: 1,
                marginLeft: SIZES.radius,
              }}
              onChange={(value) => {
                utils.validateInput(value, 1, setWeightError);
                //setWeight(value);
              }}
            />
          </View>

          {/* Email */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
            }}
            label="Email"
            value={email}
            onChange={(value) => {
              utils.validateInput(value, 1, setEmailError);
              setEmail(value);
            }}
            errorMsg={emailError}
            appendComponent={
              <FormInputCheck value={email} error={emailError} />
            }
          />

          {/* Phone Number */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
            }}
            label="Phone Number"
            value={phone}
            maxLength={13}
            keyboardType="number-pad"
            onChange={(value) => {
              setPhone(
                value
                  .replace(/\s/g, "")
                  .replace(/(\d{4})/g, "$1 ")
                  .trim()
              );
              utils.validateInput(value, 13, setPhoneError);
            }}
            errorMsg={phoneError}
            appendComponent={
              <FormInputCheck value={phone} error={phoneError} />
            }
          />

          {/* Password */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
            }}
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

          {/* Re-Enter Password */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
            }}
            label="Re-Enter Password"
            value={reenterpassword}
            secureTextEntry={!reshowPassword}
            password={password}
            onChange={(value) => {
              setReEnterPassword(value);
              utils.revalidatePassword(
                value,
                password,
                setReEnterPasswordError
              );
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

          <CheckBox
            containerStyle={{
              marginTop: SIZES.radius,
            }}
            isSelected={termsChecked}
            onPress={() => setTermsChecked(!termsChecked)}
          />

          {/* Terms and Conditions */}
          {renderTerms()}

          {/* Footer */}
          <TextButton
            label="Create Account"
            buttonContainerStyle={{
              marginTop: SIZES.radius,
              height: 55,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
            onPress={handleCreateAccount}
            disabled={disabledButton()}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }

  function renderFooterContent() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.h5,
            }}
          >
            Already Have An Account?
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderTerms() {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
        <View
          style={{
            marginTop: SIZES.radius,
          }}
        >
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.primary,
            }}
          >
            See Terms of Use
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      {renderHeader()}
      <ScrollView>
        {renderSignupForm()}
        {renderFooterContent()}
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
