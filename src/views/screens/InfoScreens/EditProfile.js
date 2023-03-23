import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
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
import { useEffect } from "react";

import { SelectList } from "react-native-dropdown-select-list";

const EditProfile = ({ navigation, route }) => {
  const { data } = route.params;
  const [showPassword, setShowPasswod] = React.useState(false);
  const [resetshowPassword, setResetShowPasswod] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [resetpassword, setResetPassword] = React.useState("");
  const [termsChecked, setTermsChecked] = React.useState(false);
  const [reshowPassword, setReShowPasswod] = React.useState(false);
  const [firstname, setFirstName] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState("");
  const [middlename, setMiddleName] = React.useState("");
  const [middleNameError, setMiddleNameError] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [heightError, setHeightError] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [weightError, setWeightError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");
  const [reenterpassword, setReEnterPassword] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [genderError, setGenderError] = React.useState("");
  const [bmi, setBmi] = React.useState();
  const [checkValidEmail, setCheckValidEmail] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

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

  const [selected, setSelected] = React.useState("");
  const data1 = [
    { key: "M", value: "Male" },
    { key: "F", value: "Female" },
  ];

  const showData = () => {
    setIsLoading(true);
    setFirstName(data.firstname);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (!isLoading) {
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
        title={"Edit Profile"}
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
          flex: 1,
          width: 350,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          justifyContent: "center",
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
            Edit your details
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
          {/* First Name */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
            }}
            label="First Name"
            value={firstname}
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

          {/* Gender */}
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
            data={data1}
            label="Gender"
            placeholder={"Select Gender"}
            setSelected={setSelected}
            notFoundText="No Data Exists, Please Input Suitable Gender"
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
                setHeight(value);
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
                setWeight(value);
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
              handleCheckEmail(value);
              setEmail(value);
            }}
            appendComponent={
              <View
                style={{
                  position: "absolute",
                  bottom: 50,
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

          {/* Phone Number */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
            }}
            label="Phone Number"
            value={phone}
            maxLength={11}
            keyboardType="number-pad"
            onChange={(value) => {
              setPhone(value);
              utils.validateInput(value, 11, setPhoneError);
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
            onChange={(text) => setPassword(text)}
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
            onChange={(text) => setReEnterPassword(text)}
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
        </KeyboardAwareScrollView>

        <TextButton
          label="Save Details"
          disabled={disabledButton()}
          buttonContainerStyle={{
            marginTop: SIZES.radius,
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

      <ScrollView>
        {/* Form */}
        {renderForm()}
      </ScrollView>
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
