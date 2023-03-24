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
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const [next, setNext] = React.useState();
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

  const goToNext = () => {
    setNext(data);
    //console.log(next);
    navigation.navigate("EditProfile", { data: next });
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
          {/* First Name */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 300,
              backgroundColor: COLORS.white,
              borderRadius: SIZES.radius,
              elevation: 5,
            }}
          >
            <Image
              source={icons.Name}
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
              {isLoading ? "Josh" : data[0].firstname}
            </Text>
          </View>

          {/* Middle Name */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 300,
              backgroundColor: COLORS.white,
              marginTop: SIZES.base,
              borderRadius: SIZES.radius,
              elevation: 5,
            }}
          >
            <Image
              source={icons.Name}
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
              {isLoading ? "Josh" : data[0].middlename}
            </Text>
          </View>

          {/* Last Name */}
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
                height: 20,
                width: 20,
                tintColor: COLORS.black,
                position: "absolute",
                left: 5,
                right: 0,
              }}
            />
            <Text style={{ ...FONTS.h3, color: COLORS.black }}>
              {isLoading ? "Josh" : data[0].lastname}
            </Text>
          </View>

          {/* Height */}
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
              {isLoading ? "Josh" : data[0].height} cm
            </Text>
          </View>

          {/* Weight */}
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
              source={icons.weight}
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
              {isLoading ? "Josh" : data[0].weight} kg
            </Text>
          </View>

          {/* Email */}
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
            <Text style={{ ...FONTS.h3 }}>
              {" "}
              {isLoading ? "Josh" : data[0].email}
            </Text>
          </View>

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
                height: 25,
                width: 25,
                tintColor: COLORS.black,
                position: "absolute",
                left: 5,
                right: 0,
              }}
            />
            <Text style={{ ...FONTS.h3 }}>
              {" "}
              {isLoading ? "Josh" : data[0].contact_number}
            </Text>
          </View>

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
              source={icons.Lock}
              style={{
                height: 25,
                width: 25,
                tintColor: COLORS.black,
                position: "absolute",
                left: 5,
                right: 0,
              }}
            />

            {/* Password  */}
            <TextInput
              disabled
              style={{
                ...FONTS.h3,
                width: "100%",
                alignItems: "center",
                backfaceVisibility: COLORS.white,
                //left: 20,
                borderRadius: SIZES.radius,
              }}
              secureTextEntry
              value={isLoading ? "Josh" : data[0].password}
            />
          </View>
        </View>
      </ScrollView>

      <TextButton
        label="Edit Password"
        buttonContainerStyle={{
          justifyContent: "center",
          marginBottom: SIZES.padding,
          alignSelf: "center",
          height: 55,
          width: 300,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
        }}
        onPress={goToNext}
      />
    </View>
  );
};

export default UserDetails;
