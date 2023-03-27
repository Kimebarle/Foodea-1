import AuthContext from "../../../api/context/auth/AuthContext";
import { BASE_URL } from "../../../api/context/auth/config";
import utils, { Utils } from "../../../utils/Utils";
import { Alert } from "react-native";
import { SIZES, COLORS, icons, FONTS } from "../../../constants";
import { Header, FormInput } from "../../components/FoodeaComponents";
import { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import axios from "axios";

const EditEmailPhone = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [data, setData] = useState();

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

      <View style={{ marginTop: SIZES.padding }}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              marginBottom: SIZES.radius,
              width: 300,
            }}
            label="Email"
            value={email}
            maxLength={3}
            placeholder={isLoading ? "Josh" : data[0].email}
            onChange={(value) => {
              setEmail(value);
              utils.validateInput(value, 1, setEmailError);
            }}
          />
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          {/* Middle Name */}
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
          <TouchableOpacity onPress={HandleSubmit}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                width: 300,
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.radius,
                marginTop: 100,
                elevation: 5,
              }}
            >
              {/* <Image
                                source={icons.edit}
                                style={{
                                    height: 20,
                                }}
                            /> */}

              <Text style={{ ...FONTS.h3, color: COLORS.white }}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditEmailPhone;
