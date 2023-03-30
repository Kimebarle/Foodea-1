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
  constants,
} from "../../../constants";
import AuthContext from "../../../api/context/auth/AuthContext";
import { BASE_URL } from "../../../api/context/auth/config";
import axios from "axios";

const MyAvatar = ({ navigation }) => {
  const { userId } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState();
  const [image, setImage] = useState(images.body);
  const getUserData = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${BASE_URL}app_users?user_id[eq]=${userId}`
    );
    setUserInfo(response.data);
    const bmi = await response.data[0].bmi;
    const gender = await response.data[0].gender;
    setIsLoading(false);
    return {
      bmi,
      gender,
    };
  };

  const bmiChecker = async () => {
    const data = await getUserData();

    if (data.gender === "F") {
      if (data.bmi <= 23) {
        setGender("Normal");
        setImage(images.FemaleNormal);
      } else {
        setGender("Overweight");
        setImage(images.FemaleObese);
      }
    } else {
      if (data.bmi <= 19) {
        setGender("UnderWeight");
        setImage(images.underweightMale);
      } else if (data.bmi <= 25.8) {
        setGender("Normal");
        setImage(images.body);
      } else if (data.bmi <= 27.3) {
        setImage(images.BoyObese);
        setGender("OverWeight");
      } else {
        setImage(images.SuperObeseMale);
        setGender("Obese");
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getUserData();
    bmiChecker();
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
        {/* {console.log(bmiChecker())} */}
        <Image
          source={image}
          style={{
            width: 310,
            height: 400,
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
              ...FONTS.h3,
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
            left: 260,
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
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
              ...FONTS.h3,
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
            left: 230,
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
            }}
          >
            {isLoading ? "Status" : gender}
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
            width: 330,
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
              left: 5,
              tintColor: COLORS.red,
              height: 20,
              width: 20,
            }}
          />
          <Text
            style={{
              ...FONTS.h5,
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
            width: 330,
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
              left: 5,
              tintColor: COLORS.red,
              height: 20,
              width: 20,
            }}
          />
          <Text
            style={{
              ...FONTS.h5,
            }}
          >
            {isLoading ? "placeholder" : userInfo[0].email}
          </Text>
        </View>

        <View
          style={{
            height: 40,
            width: 330,
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
              left: 5,
              tintColor: COLORS.red,
              height: 20,
              width: 20,
            }}
          />
          <Text
            style={{
              ...FONTS.h5,
            }}
          >
            {isLoading ? "placeholder" : userInfo[0].address}
          </Text>
        </View>

        <View
          style={{
            height: 40,
            width: 330,
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
            source={icons.phone}
            style={{
              position: "absolute",
              left: 5,
              tintColor: COLORS.red,
              height: 20,
              width: 20,
            }}
          />
          <Text
            style={{
              ...FONTS.h5,
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
