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

const UserDetails = ({ navigation }) => {
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

  const goToNext = () => {
    setNext(data);
    //console.log(next);
    navigation.navigate("EditProfile", { data: next });
  };

  const HandleNames = () => {
    navigation.push("Names");
  };

  const HandleHeightandWeight = () => {
    navigation.push("HeightWeight");
  };

  const HandleEmailPhone = () => {
    navigation.push("EmailPhoneNumber");
  };

  const HandlePassword = () => {
    navigation.push("Password");
  };

  const HandleAddress = () => {
    navigation.push("AddressDisplay");
  };

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"User Details"}
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

  // function renderLogo() {
  //   return (
  //     <View
  //       style={{
  //         marginTop: SIZES.padding,
  //         height: 50,
  //         alignItems: "center",
  //         justifyContent: "center",
  //         marginBottom: SIZES.padding,
  //       }}
  //     >
  //       <Image
  //         source={images.profilepic}
  //         resizeMode="contain"
  //         style={{
  //           width: 200,
  //         }}
  //       />
  //     </View>
  //   );
  // }

  // function renderEditProfileButton() {
  //   return (
  //     <View
  //       style={{
  //         left: 230,
  //         marginBottom: 20,
  //       }}
  //     >
  //       <EditButton
  //         buttonContainerStyle={{
  //           width: 100,
  //           borderRadius: SIZES.base,
  //           backgroundColor: "#F54748",
  //         }}
  //         label="Edit Profile"
  //         labelStyle={{
  //           color: COLORS.white,
  //         }}
  //         onPress={goToNext}
  //       />
  //     </View>
  //   );
  // }

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

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.radius,
          paddingBottom: SIZES.padding,
          marginTop: SIZES.radius,
        }}
      >
        {/* Edit Profile
        {renderEditProfileButton()} */}

        {/* Logo
        {renderLogo()} */}

        <View style={{ alignItems: "center", marginTop: SIZES.padding }}>
          {/* First Name, Middle Name, Last Name */}
          <TouchableOpacity onPress={HandleNames}>
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
                source={icons.Name}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                  position: "absolute",
                  left: 5,
                  right: 0,
                }}
              />
              <Text style={{ ...FONTS.h3 }}>Name</Text>
            </View>
          </TouchableOpacity>

          {/* Address */}
          <TouchableOpacity onPress={HandleAddress}>
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
                source={icons.pinlocation}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                  position: "absolute",
                  left: 5,
                  right: 0,
                }}
              />
              <Text style={{ ...FONTS.h3 }}>Address</Text>
            </View>
          </TouchableOpacity>

          {/* Height and Weight */}
          <TouchableOpacity onPress={HandleHeightandWeight}>
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
                source={icons.height}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                  position: "absolute",
                  left: 5,
                  right: 0,
                }}
              />
              <Text style={{ ...FONTS.h3 }}>Height and Weight</Text>
            </View>
          </TouchableOpacity>

          {/* Email and Phone Number */}
          <TouchableOpacity onPress={HandleEmailPhone}>
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
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                  position: "absolute",
                  left: 5,
                  right: 0,
                }}
              />
              <Text style={{ ...FONTS.h3 }}>Email and Phone Number</Text>
            </View>
          </TouchableOpacity>

          {/* Password */}
          <TouchableOpacity onPress={HandlePassword}>
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
                source={icons.Lock}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                  position: "absolute",
                  left: 5,
                  right: 0,
                }}
              />
              <Text style={{ ...FONTS.h3 }}>Password</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserDetails;
