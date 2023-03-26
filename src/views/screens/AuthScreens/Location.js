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

const Location = ({ navigation, route }) => {
  const { passedList2 } = route.params;
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [cityError, setCityError] = React.useState("");
  const [brgy, setBrgy] = React.useState("");
  const [brgyError, setBrgyError] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [zipCodeError, setZipCodeError] = React.useState("");
  const [addressError, setAddressError] = React.useState("");

  const disabledButton = () => {
    // return !address || !city || !brgy || !zipCode;
  };

  const handleSignUpPress = () => {
    const tempList = [...passedList2];
    const list3 = tempList.map((item) => ({
      ...item,
      address: `${address} ${city} ${brgy} ${zipCode}`,
    }));
    // console.log(list3);
    navigation.navigate("Email", { passedList3: list3 });
  };

  function renderDetails() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          height: 530,
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
            Location
          </Text>
          <Text
            style={{
              ...FONTS.h5,
            }}
          >
            Input your Address, City, Barangay, ZIP Code.
          </Text>

          {/* Address */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              marginTop: SIZES.radius,
            }}
            label="Address"
            value={address}
            placeholder="Block, Street..."
            maxLength={50}
            onChange={(value) => {
              setAddress(value);
              utils.validateInput(value, 1, setAddressError);
            }}
            errorMsg={addressError}
            appendComponent={
              <FormInputCheck value={address} error={addressError} />
            }
          />

          {/* City */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
            }}
            label="City"
            value={city}
            maxLength={50}
            onChange={(value) => {
              setCity(value);
              utils.validateInput(value, 1, setCityError);
            }}
            errorMsg={cityError}
            appendComponent={<FormInputCheck value={city} error={cityError} />}
          />

          {/* Barangay */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
            }}
            label="Barangay"
            value={brgy}
            maxLength={5}
            keyboardType="number-pad"
            onChange={(value) => {
              setBrgy(value);
              utils.validateInput(value, 1, setBrgyError);
            }}
            errorMsg={brgyError}
            appendComponent={<FormInputCheck value={brgy} error={brgyError} />}
          />

          {/* ZIP CODE */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
            }}
            label="ZIP CODE"
            value={zipCode}
            maxLength={4}
            keyboardType="number-pad"
            onChange={(value) => {
              setZipCode(value);
              utils.validateInput(value, 1, setZipCodeError);
            }}
            errorMsg={zipCodeError}
            appendComponent={
              <FormInputCheck value={zipCode} error={zipCodeError} />
            }
          />
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

      {/* Logo */}
      {renderLogo()}

      {/* Email Address */}
      {renderDetails()}
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  forgotPassword: {
    marginTop: 10,
  },
  signup_text: {},
});
