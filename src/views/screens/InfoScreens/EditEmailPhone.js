import axios from "axios";
import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-paper";
import AuthContext from "../../../api/context/auth/AuthContext";
import { BASE_URL } from "../../../api/context/auth/config";
import utils, { Utils } from "../../../utils/Utils";
import { Alert } from "react-native";
import {
  images,
  constants,
  SIZES,
  COLORS,
  icons,
  FONTS,
} from "../../../constants";
import {
  Header,
  TextButton,
  FormInput,
  IconButton,
  CheckBox,
  FormInputCheck,
  EditButton,
} from "../../components/FoodeaComponents";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditEmailPhone = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");
  const [data, setData] = React.useState();
  const [next, setNext] = React.useState();
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

  const getUserData = async () => {
    const userID = user.user_id;
    setIsLoading(true);
    const response = await axios.get(`${BASE_URL}app_users/${userID}`);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getUserData();
  }, []);

  const confirmAction = async () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Update Your Information",
        "Are you sure you want to update your information",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => resolve(false),
          },
          {
            text: "Confirm",
            onPress: () => resolve(true),
          },
        ]
      );
    });
  };

  const HandleSubmit = async () => {
    const decision = await confirmAction();
    if (decision) {
    } else {
      console.log(decision);
    }
  }
    const disabledButton = () => {
      return !phone || !email;
    };

    function renderHeader() {
      return (
        <Header
          containerStyle={{
            height: 80,
            marginHorizontal: SIZES.padding,
            alignItems: "center",
          }}
          title={"Edit Email and Number"}
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
              onPress={() => navigation.goBack()}
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

    return (
      <View
        style={{
          flex: 1,
          height: SIZES.height,
          width: SIZES.width,
          backgroundColor: COLORS.white,
        }}
      >
        {/* HEADER */}
        {renderHeader()}

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
          <View style={{ marginTop: SIZES.padding }}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              {/* Email */}
              
              <FormInput
                containerStyle={{
                  borderRadius: SIZES.radius,
                  marginBottom: SIZES.radius,
                  width: 300,
                }}
                label="Email"
                value={email}
                placeholder={isLoading ? "Josh" : data[0].email}
                onChange={(value) => {
                  setEmail(value);
                  handleCheckEmail(value);
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

            <View
              style={{
                alignItems: "center",
              }}
            >
              {/* Phone Number */}
              <FormInput
                containerStyle={{
                  borderRadius: SIZES.radius,
                  marginBottom: SIZES.radius,
                  width: 300,
                }}
                label="Phone Number"
                value={phone}
                keyboardType="number-pad"
                maxLength={11}
                placeholder={isLoading ? "Josh" : data[0].contact_number}
                onChange={(value) => {
                  setPhone(value);
                  utils.validateInput(value, 1, setPhoneError);
                }}
              />
            </View>

            <View
              style={{
                alignItems: "center",
              }}
            >
              <TextButton
                label="Submit"
                disabled={disabledButton()}
                buttonContainerStyle={{
                  height: 50,
                  width: 300,
                  marginTop: SIZES.padding,
                  alignItems: "center",
                  borderRadius: SIZES.radius,
                  marginBottom: SIZES.padding,
                  backgroundColor: !disabledButton()
                    ? COLORS.primary
                    : COLORS.gray,
                }}
                onPress={HandleSubmit}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  };
export default EditEmailPhone;

const styles = StyleSheet.create({
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
    position: "absolute",
    bottom: 10,
    ...FONTS.h5,
  },
});
