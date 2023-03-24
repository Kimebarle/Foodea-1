import React, { useContext } from "react";
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

const MyAvatar = ({ navigation }) => {
  const { userInfo, user } = useContext(AuthContext);

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
            {user.height}
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
            {user.bmi}
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
            {user.weight} kg
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
            {user.firstname} {user.middlename} {user.lastname}
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
            {user.email}
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
            {user.address}
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
            {user.contact_number}
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
