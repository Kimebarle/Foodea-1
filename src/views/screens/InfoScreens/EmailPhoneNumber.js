import axios from "axios";
import React, { useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import AuthContext from "../../../api/context/auth/AuthContext";
import { BASE_URL } from "../../../api/context/auth/config";
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

const EmailPhoneNumber = ({ navigation }) => {
  const { userId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const [next, setNext] = React.useState();
  const getUserData = async () => {
    setIsLoading(true);
    const response = await axios.get(`${BASE_URL}app_users/${userId}`);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getUserData();
  }, []);

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"Email and Number"}
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
      }}
    >
      {/* HEADER */}
      {renderHeader()}

      <View style={{ flex: 1, marginTop: SIZES.padding }}>
        <View
          style={{
            justifyContent: "flex-start",
          }}
        >
          {/* Height */}
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.h3,
              fontSize: 15,
              marginTop: SIZES.base,
              marginLeft: SIZES.padding,
            }}
          >
            Email
          </Text>
        </View>

                <View style={{
                    alignItems: 'center',
                }}>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 300,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            marginTop: SIZES.base,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={icons.at}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.black,
                                position: "absolute",
                                left: 5,
                                right: 0,
                            }}
                        />
                        <Text style={{ ...FONTS.h4, color: COLORS.black }}>
                            {" "}
                            {isLoading ? "Josh" : data[0].email}
                        </Text>
                    </View>
                </View>

        <View
          style={{
            justifyContent: "flex-start",
          }}
        >
          {/* Phone Number */}
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.h3,
              fontSize: 15,
              marginTop: SIZES.base,
              marginLeft: SIZES.padding,
            }}
          >
            Phone Number
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            marginBottom: SIZES.padding,
          }}
        >
          {/* Phone Number */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 300,
              backgroundColor: COLORS.white,
              borderRadius: SIZES.radius,
              marginTop: SIZES.base,
              elevation: 5,
            }}
          >
            <Image
              source={icons.phone}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.black,
                position: "absolute",
                left: 5,
                right: 0,
              }}
            />
            <Text style={{ ...FONTS.h3, color: COLORS.black }}>
              {" "}
              {isLoading ? "Josh" : data[0].contact_number}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("EditEmailPhone")}
          >
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
                                    width: 20,
                                    tintColor: COLORS.white,
                                    position: "absolute",
                                    right: 15

                                }}
                            /> */}

              <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                Edit Details
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EmailPhoneNumber;
