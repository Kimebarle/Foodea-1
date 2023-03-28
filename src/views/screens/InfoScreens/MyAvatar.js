import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  Header,
  EditButton,
  TextButton,
  TextInput,
} from "../../components/FoodeaComponents";
import {
  icons,
  SIZES,
  COLORS,
  dummyData,
  FONTS,
  images,
} from "../../../constants";
import AuthContext from "../../../api/context/auth/AuthContext";
import { BASE_URL } from "../../../api/context/auth/config";
import axios from "axios";

const MyAvatar = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getUserData = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${BASE_URL}app_users?user_id[eq]=${user.user_id}`
    );
    setUserInfo(response.data);
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
        title={"MY AVATAR"}
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

  function renderBody() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <Image
          source={images.body}
          style={{
            justifyContent: "center",
          }}
        />

        {/* HEIGHT */}
        <View
          style={{
            position: "absolute",
            top: 40,
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
            }}
          >
            {isLoading ? "placeholder" : userInfo[0].height}
            <Text> cm</Text>
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: COLORS.primary,
            }}
          >
            {" "}
            HEIGHT{" "}
          </Text>
        </View>

        {/* BMI */}
        <View
          style={{
            position: "absolute",
            top: 70,
            left: 220,
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
            }}
          >
            {isLoading ? "placeholder" : userInfo[0].bmi}
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: COLORS.primary,
            }}
          >
            BMI
          </Text>
        </View>

        {/* WEIGHT */}
        <View
          style={{
            position: "absolute",
            top: 230,
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
            }}
          >
            {isLoading ? "placeholder" : userInfo[0].weight} kg
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: COLORS.primary,
            }}
          >
            WEIGHT
          </Text>
        </View>

        {/* STATUS */}
        <View
          style={{
            position: "absolute",
            top: 250,
            left: 210,
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
            }}
          >
            Normal
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: COLORS.primary,
            }}
          >
            STATUS
          </Text>
        </View>
      </View>
    );
  }

  function renderPersonalInformation() {
    return (
      <View
        style={{
          alignItems: "center",
          marginTop: SIZES.base,
        }}
      >
        <Text
          style={{
            ...FONTS.h2,
            position: "absolute",
            top: 0,
          }}
        >
          Personal Information
        </Text>

        <View
          style={{
            height: 40,
            width: 250,
            marginTop: 40,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            elevation: 5,
          }}
        >
          <Image
            source={icons.My_Profile}
            style={{
              position: "absolute",
              left: 2,
              tintColor: COLORS.red,
              height: 30,
              width: 30,
            }}
          />
          <Text
            style={{
              ...FONTS.h4,
            }}
          >
            {isLoading
              ? "placeholder"
              : userInfo[0].firstname +
                " " +
                userInfo[0].middlename +
                " " +
                userInfo[0].lastname}
          </Text>
        </View>

        <View
          style={{
            height: 40,
            width: 250,
            marginTop: 10,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            elevation: 5,
          }}
        >
          <Image
            source={icons.Email}
            style={{
              position: "absolute",
              left: 2,
              tintColor: COLORS.red,
              height: 30,
              width: 30,
            }}
          />
          <Text
            style={{
              ...FONTS.h4,
            }}
          >
            {isLoading ? "placeholder" : userInfo[0].email}
          </Text>
        </View>

        <View
          style={{
            height: 40,
            width: 250,
            marginTop: SIZES.base,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            elevation: 5,
          }}
        >
          <Image
            source={icons.location}
            style={{
              position: "absolute",
              left: 2,
              tintColor: COLORS.red,
              height: 30,
              width: 30,
            }}
          />
          <Text
            style={{
              ...FONTS.h4,
            }}
          >
            {isLoading ? "placeholder" : userInfo[0].address}
          </Text>
        </View>

        <View
          style={{
            height: 40,
            width: 250,
            marginTop: SIZES.base,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            elevation: 5,
          }}
        >
          <Image
            source={icons.Phone}
            style={{
              position: "absolute",
              left: 2,
              tintColor: COLORS.red,
              height: 30,
              width: 30,
            }}
          />
          <Text
            style={{
              ...FONTS.h4,
            }}
          >
            {isLoading ? "0999999999999" : userInfo[0].contact_number}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        height: SIZES.height,
        width: SIZES.width,
      }}
    >
      {/* Header */}
      {renderHeader()}

      {/* Body */}
      {renderBody()}

      {/* Personal Information */}
      {renderPersonalInformation()}
    </View>
  );
};

export default MyAvatar;
