import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";

import {
  images,
  constants,
  SIZES,
  COLORS,
  icons,
  FONTS,
} from "../../../constants";
import { Header, LineDivider } from "../../components/FoodeaComponents";
import AuthContext from "../../../api/context/auth/AuthContext";

const AccountScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"Profile"}
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
            onPress={() => navigation.navigate("BottomTab")}
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

  function renderDetails() {
    return (
      <View
        style={{
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 20,
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.radius,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* DETAILS */}
          <View
            style={{
              marginLeft: SIZES.radius,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
              }}
            >
              Christopher Calleja
            </Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h5,
              }}
            >
              christopher_calleja@gmail.com
            </Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h5,
              }}
            >
              09123456789
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderLogout() {
    return (
      <View>
        <TouchableOpacity onPress={logout}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: 25,
              width: 110,
              backgroundColor: COLORS.white,
              borderRadius: SIZES.radius,
              position: "absolute",
              left: 235,
              elevation: 5,
              bottom: 20,
            }}
          >
            {/* <Image
                            source={icons.logout}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.black,
                                position: 'absolute',
                                left: 5,
                                right: 0,
                            }}
                        /> */}
            <Text style={{ ...FONTS.h4, textAlign: "center" }}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
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
      {/* Header */}
      {renderHeader()}

      {/* Logout */}
      {/* {renderLogout()} */}

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.radius,
          paddingBottom: 150,
        }}
      >
        {/* Details */}
        {/* {renderDetails()} */}

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: SIZES.padding,
          }}
        >
          {/* Avatar */}
          <TouchableOpacity onPress={() => navigation.navigate("MyAvatar")}>
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
                source={icons.My_Profile}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                  position: "absolute",
                  left: 5,
                  right: 0,
                }}
              />
              <Text style={{ ...FONTS.h2 }}>My Avatar</Text>
            </View>
          </TouchableOpacity>

          {/* Details */}
          <TouchableOpacity onPress={() => navigation.navigate("UserDetails")}>
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
                source={icons.My_Profile}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                  position: "absolute",
                  left: 5,
                  right: 0,
                }}
              />
              <Text style={{ ...FONTS.h2 }}>User Details</Text>
            </View>
          </TouchableOpacity>

          {/* Favorite */}
          <TouchableOpacity onPress={() => navigation.navigate("Favorite")}>
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
                source={icons.love}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                  position: "absolute",
                  left: 5,
                  right: 0,
                }}
              />
              <Text style={{ ...FONTS.h2 }}>Favorite</Text>
            </View>
          </TouchableOpacity>

          {/* Activity Log */}
          <TouchableOpacity onPress={() => navigation.navigate("ActivityLog")}>
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
                source={icons.menu}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.primary,
                  position: "absolute",
                  left: 5,
                  right: 0,
                }}
              />
              <Text style={{ ...FONTS.h2, color: COLORS.black }}>
                Activity Log
              </Text>
            </View>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity onPress={logout}>
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
                marginTop: 10,
              }}
            >
              <Image
                source={icons.logout}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                  position: "absolute",
                  left: 7,
                  right: 0,
                }}
              />
              <Text style={{ ...FONTS.h2, color: COLORS.black }}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
